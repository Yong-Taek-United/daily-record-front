import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const isServer = () => {
  return typeof window === 'undefined';
};

const REFRESH_API = '/auth/refresh';
const LOGIN_PATH = '/account/login';

let accessToken = '';
let context = <GetServerSidePropsContext>{};
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken;
};

export const getAccessToken = () => {
  accessToken;
};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const instanceSSR = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // to send cookie
});

instanceSSR.interceptors.request.use((config) => {
  if (config.url === REFRESH_API) {
    // 리프래시 토큰 헤더에 담는 로직 짜기
    // 토큰 없으면 바로 세션 만료
    const refreshToken = getCookie('refreshToken', {
      req: context.req,
      res: context.res,
    });

    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
  } else {
    // 일반 어세스 토큰 헤더에 담는 로직
    const accessToken = getCookie('accessToken', {
      req: context.req,
      res: context.res,
    });
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  if (isServer() && context?.req?.cookies) {
    config.headers.Cookie = `gid=${context.req.cookies.gid};`;
  }
  return config;
});

instanceSSR.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    if (
      error.response?.status === 401 &&
      !error.response?.config?.url?.includes(REFRESH_API) &&
      !error.response?.config?.url?.includes('/auth/login')
    ) {
      return refreshToken(error);
    }
    return Promise.reject(error);
  }
);

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = async (oError: AxiosError) => {
  try {
    const { response } = oError;

    // create new Promise to retry original request
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        response!.config.headers['Authorization'] = `Bearer ${token}`;
        resolve(instanceSSR(response!.config));
      });
    });

    // check whether refreshing token or not
    if (!fetchingToken) {
      fetchingToken = true;

      // refresh token
      const { data } = await instanceSSR.post(REFRESH_API);
      if (data.statusCode === 200) {
        if (isServer()) {
          setCookie('accessToken', data.data.accessToken, {
            req: context.req,
            res: context.res,
          });
          setCookie('refreshToken', data.data.refreshToken, {
            req: context.req,
            res: context.res,
          });
        }
        // // when new token arrives, retry old requests

        onAccessTokenFetched(
          !isServer() ? getCookie('accessToken') : data.data.accessToken
        );
      } else throw new Error('Refresh token renewal failed');
    }
    return retryOriginalRequest;
  } catch (error) {
    // on error go to login page
    if (!isServer() && !Router.asPath.includes(LOGIN_PATH)) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      Router.push(LOGIN_PATH);
    }
    if (isServer()) {
      deleteCookie('accessToken', { req: context.req, res: context.res });
      deleteCookie('refreshToken', { req: context.req, res: context.res });
      context.res.setHeader('location', LOGIN_PATH);
      context.res.statusCode = 302;
      context.res.end();
    }
    return Promise.reject(oError);
  } finally {
    fetchingToken = false;
  }
};
