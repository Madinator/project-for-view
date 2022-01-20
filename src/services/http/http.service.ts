import { userApiService } from '../api/users';
import { mapSearchParams } from './http-helpers';
import { tokenService } from '../local-storage/storage.service';
import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenStatic } from 'axios';
import { DeepUndefinable } from 'ts-essentials';
import { authStore } from '../stores/authStore';


export const headersAppJSON = { 'Content-Type': 'application/json' };

const baseApiUrl = "baseurl"

const getHeaderAuth = (auth_token?: string) => {
  return { Authorization: 'Bearer ' + auth_token ?? '' };
};

const defaultJsonHeaders = () => {
  const token = tokenService.getToken();
  if (token) {
    return { ...headersAppJSON, ...getHeaderAuth(token) };
  }
  return headersAppJSON;
};

interface _AxiosInstance extends AxiosInstance {
  isCancel: (value: unknown) => boolean;
  CancelToken: CancelTokenStatic;
}

const _axiosInstance: _AxiosInstance = <_AxiosInstance>axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

_axiosInstance.interceptors.request.use(requestInterceptorsConfigOverride);
_axiosInstance.interceptors.response.use(
  (response) => response,
  (config) => responseInterceptionConfigOverride(config, _axiosInstance, _axiosInstance),
);
_axiosInstance.CancelToken = axios.CancelToken;
_axiosInstance.isCancel = axios.isCancel;

export const axiosInstance = _axiosInstance;

type HttpServiceParams =
  | undefined
  | DeepUndefinable<{ query?: Record<string, unknown> } & Record<string, unknown>>;

const httpService = {
  get: <T>(url: string, p: HttpServiceParams = {}): Promise<TypedResponse<T>> => {
    const { query, ...params } = p;
    const _url = query
      ? baseApiUrl + url + '?' + mapSearchParams(query)
      : baseApiUrl + url;
    return axiosInstance.get(_url, {
      params: { ...params },
    });
  },

  post: <T>(
    url: string,
    body: unknown,
    p: HttpServiceParams = {},
  ): Promise<TypedResponse<T>> => {
    const { query, ...params } = p;
    return axiosInstance.post(url, body, { params: query, ...params, data: body });
  },

  put: <T>(
    url: string,
    body: unknown,
    p: HttpServiceParams = {},
  ): Promise<TypedResponse<T>> => {
    const { query, ...params } = p;

    return axiosInstance.put(url, body, { params: query, ...params, data: body });
  },
  patch: <T>(
    url: string,
    body: unknown,
    p: HttpServiceParams = {},
  ): Promise<TypedResponse<T>> => {
    const { query, ...params } = p;
    return axiosInstance.patch(url, body, { params: query, ...params, data: body });
  },
  delete: <T>(
    url: string,
    body: unknown,
    p: HttpServiceParams = {},
  ): Promise<TypedResponse<T>> => {
    const { query, ...params } = p;
    return axiosInstance.delete(url, { params: query, ...params, data: body });
  },
};

async function responseInterceptionConfigOverride(
  error : any,
  instanceRefresh : any,
  instanceRequest : any,
) {
  const AuthStore = authStore()
  const originalRequest = error.config;
  if (error?.response?.status === 403) {
    return Promise.reject(error);
  }
  if (error?.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const token = tokenService.getToken();
    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken) {
      console.log('error 401, trying to refresh with token:' + refreshToken);
      // axios.defaults.headers.common["Authorization"] = refreshToken;
      try {
        try {
          const response = await userApiService.refreshToken({ token: refreshToken });
          const resData = response.data;
          if (resData) {
            tokenService.setToken(resData?.accessToken);
            tokenService.setRefreshToken(resData?.refreshToken);
            console.log(
              'setTokens to storage and retrying  request with 401 error',
              response,
            );
            instanceRequest.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${resData.accessToken}`;
            return instanceRequest(originalRequest);
            // }
            // else if (Array.isArray(response.errors)) {
            //   const [key] = response.errors;
            //   if (key === 'This refresh token has been used') {
            //     return instanceRequest(originalRequest);
            //   } else {
            //     await authStore.logout();
            //   }
          } else {
            await AuthStore.logout();
          }

          console.log('finished tokenRefresh request', response);
        } catch (e) {
          await AuthStore.logout();
        }
      } catch (e) {
        await AuthStore.logout();
      }
    } else {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject(error);
  }
}
function requestInterceptorsConfigOverride(config: AxiosRequestConfig) {
  const accessToken = tokenService.getToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
}

export { httpService };
