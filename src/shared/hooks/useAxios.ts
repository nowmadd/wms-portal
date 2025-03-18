import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { authToken } from '../utils/authToken';
import { CONFIG } from '../utils/config';

export interface IAxios<P, B> {
  url?: string;
  params?: P;
  body?: B;
  data?: B;
  headers?: AxiosRequestHeaders;
  onUploadProgress?: (event: any) => void;
}

const { getAuthToken, getRefreshToken, getUser } = authToken();

export const useAxios = () => {
  const bearerToken = getAuthToken();

  const dispatchError = (error: any) => document.dispatchEvent(new CustomEvent('apiError', { detail: error }));

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken ? `Bearer ${bearerToken}` : false,
    },
  });

  instance.interceptors.request.use(
    (request) => {
      if (CONFIG.isDevelopment) {
        console.log(
          `%c ${request?.method} request for ${request.url}\n`,
          'color:white;background-color:#fa8c16;padding:5px;border-radius:5px;',
          request.data,
        );
        console.log({ params: request.params });
      }
      return request;
    },
    async (error) => {
      if (CONFIG.isDevelopment) console.log(error);
      dispatchError(error.message);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      if (CONFIG.isDevelopment) {
        console.log(
          `%c response from ${response.config.url}\n`,
          'color:white;background-color:#1890ff;padding:5px;border-radius:5px;',
          response.data,
        );
      }

      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      if (CONFIG.isDevelopment) console.log(error);
      if (
        Boolean(
          error.response &&
            (error.response.data.message === 'The incoming token has expired' ||
              error.response.data.message === 'Unauthorized'),
        )
      ) {
        const rToken = getRefreshToken();
        const email = getUser()?.email;
        //TODO: handle token expiry and refresh token here
        if (Boolean(rToken)) {
          dispatchError('Session expired. Auto renewing token.');
          try {
            const newToken = await axios.post(`${CONFIG.USERS_API}/${email}/authenticate`, {
              refresh_token: rToken,
              action: 'refreshToken',
            });

            const { data, success } = newToken.data;
            if (Boolean(success)) {
              const user = JSON.parse(localStorage.getItem('user') || '');
              localStorage.setItem(
                'user',
                JSON.stringify({
                  ...user,
                  AccessToken: data.AccessToken,
                }),
              );

              return window.location.reload();
              // originalConfig.headers.Authorization = `Bearer ${data.AccessToken}`;
              // return axios(originalConfig);
            } else {
              localStorage.clear();
              window.location.reload();
            }
          } catch (error) {
            //check if the browser is safari
            if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
              console.log('safari error', error);
              dispatchError('Session expired. Please login again.');
            } else {
              localStorage.clear();
              window.location.reload();
            }
          }
        }
      } else {
        const urlLastPart = error?.config?.url?.split('/').pop();

        return dispatchError(`${error.message}. Failed to get reponse from endpoint /${urlLastPart}.`);
      }
      return Promise.reject(error);
    },
  );

  const GET = async <R, P = unknown, B = unknown>(args: IAxios<P, B>): Promise<AxiosResponse<R>> => {
    try {
      return await instance({
        ...args,
        method: 'GET',
      });
    } catch (e) {
      throw e;
    }
  };

  const POST = async <R, P = unknown, B = unknown>(args: IAxios<P, B>): Promise<AxiosResponse<R>> => {
    try {
      return await instance({
        ...args,
        method: 'POST',
      });
    } catch (e) {
      throw e;
    }
  };

  const PUT = async <P, B = unknown>(args: IAxios<P, B>): Promise<AxiosResponse> => {
    try {
      return await instance({
        ...args,
        method: 'PUT',
      });
    } catch (e) {
      throw e;
    }
  };

  const PATCH = async <P, B = unknown>(args: IAxios<P, B>): Promise<AxiosResponse> => {
    try {
      return await instance({
        ...args,
        method: 'PATCH',
      });
    } catch (e) {
      throw e;
    }
  };

  const DELETE = async <P, B = unknown>(args: IAxios<P, B>): Promise<AxiosResponse> => {
    try {
      return await instance({
        ...args,
        method: 'DELETE',
      });
    } catch (e) {
      throw e;
    }
  };

  return {
    instance,
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
  };
};
