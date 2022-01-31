import { httpService } from '../../http/http.service';
import { API_VERSION } from '../constants';
import {
  LoginResponse,
  RefreshResponse,
  User,
  UserCreateDTO,
  UserUpdateDTO,
} from './models';

const route = 'users';

interface UserApiService {
  authorization: (
    v: { numberPhone: number; password: string },
  ) => Promise<TypedResponse<LoginResponse>>;
  refreshToken: ({ token: string  }, p?: any) => Promise<TypedResponse<RefreshResponse>>;
  create: (v: UserCreateDTO) => Promise<TypedResponse<User>>;
  update: (ID: number, v: UserUpdateDTO) => Promise<TypedResponse<User>>;
  requestSMSCode:  ( v: { numberPhone: number, isRegister: boolean }) => Promise<TypedResponse<any>>
}

export const userApiService: UserApiService = {
  authorization: async ({ numberPhone, password }) => {
    return await httpService.post(`/Account/LoginWeb`, { numberPhone, password });
  },
  refreshToken: async ({ token }, params) => {
    return await httpService.get(`/refresh/${token}`, params);
  },
  create: async (data) => {
    return await httpService.post(`/${API_VERSION}/${route}`, data);
  },
  update: async (ID, data) => {
    return await httpService.patch(`/${API_VERSION}/${route}/${ID}`, data);
  },
  requestSMSCode: async ({ numberPhone, isRegister }) => {
    return await httpService.post(`/Account/RequestSmsCodeWeb`, { numberPhone, isRegister });
  },
};
