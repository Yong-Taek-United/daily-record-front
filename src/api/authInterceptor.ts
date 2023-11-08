import { AxiosInstance, AxiosResponse } from 'axios';
import { Holder } from './holder';

type ReqDataType = {
  resultCode: number;
  resultHash: any;
};

const REFRESH_API = '/login/refresh_token';

export const authInterceptors = (instance: AxiosInstance) => {
  let lock = false;
  const holder = new Holder();

  instance.interceptors.request.use(async (config) => {
    if (config.url === REFRESH_API) {
      // 리프래시 토큰 헤더에 담는 로직 짜기
      // 토큰 없으면 바로 세션 만료
    } else {
      // 일반 어세스 토큰 헤더에 담는 로직 짜기
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

      if (status === 401) {
        // 토큰 만료 됐을때 리프래쉬 로직 작성
        if (error?.message == 'AccessTokenExpiredError') {
          try {
            if (!lock) {
              lock = true;
              holder.hold();
              try {
                const res = instance(REFRESH_API);
                // res.data.status === 200 이면 토큰 정보 담기 (쿠키일 경우 서버에서 담아 줌)

                setTimeout(() => {
                  holder.resolve();
                  lock = false;
                }, 500);
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
        }
      }

      return Promise.reject(axiosError);
    }
  );
};
