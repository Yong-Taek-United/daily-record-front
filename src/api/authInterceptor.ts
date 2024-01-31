import { AxiosInstance, AxiosResponse } from 'axios';
import { Holder } from './holder';
import { getCookie } from 'cookies-next';

const REFRESH_API = '/auth/refresh';

export const authInterceptors = (instance: AxiosInstance) => {
  let lock = false;
  const holder = new Holder();

  instance.interceptors.request.use(async (config) => {
    if (config.url === REFRESH_API) {
      // 리프래시 토큰 헤더에 담는 로직 짜기
      // 토큰 없으면 바로 세션 만료
      const refreshToken = getCookie('refreshToken');

      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`;
      } else {
        window.location.href = '/account/login';
      }
    } else {
      // 일반 어세스 토큰 헤더에 담는 로직
      const accessToken = getCookie('accessToken', {});
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    if (lock && config.url !== REFRESH_API) await holder.promise; // accessToken 재발급 요청 중에는 다른 요청을 잠시 hold 함

    return config;
  });

  instance.interceptors.response.use(
    async (response: AxiosResponse): Promise<any> => {
      return Promise.resolve(response);
    },

    async (axiosError) => {
      const {
        response: { data: error, status },
        config,
      } = axiosError;

      if (status === 401 && error.path === REFRESH_API) {
        // refreshToken도 만료
        return (window.location.href = '/account/login');
      } else if (status === 401 && error.path !== '/auth/login') {
        // accessToken 토큰 만료 됐을때 리프래쉬 실행
        try {
          if (!lock) {
            // hold!
            lock = true;
            holder.hold();

            try {
              // refresh!
              const res = await instance.post(REFRESH_API);
              console.log(res);
              holder.resolve();
              lock = false;
            } catch (error) {
              lock = false;
              holder.reject();
              throw new Error('Refresh token renewal failed');
            }
          } else await holder.promise; // 이미 accessToken 재발급 요청을 했다면  hold

          return instance(config); // 기존 요청을 재요청
        } catch (error) {
          console.log('interceptor error ', error);
        }
      } else {
        return Promise.reject(axiosError);
      }
      return Promise.resolve(config);
    }
  );
};
