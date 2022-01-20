import { httpService } from '@services/http/http.service';
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
    v: { username: string; password: string },
    p?: any,
  ) => Promise<TypedResponse<LoginResponse>>;
  refreshToken: ({ token: string  }, p?: any) => Promise<TypedResponse<RefreshResponse>>;
  create: (v: UserCreateDTO) => Promise<TypedResponse<User>>;
  update: (ID: number, v: UserUpdateDTO) => Promise<TypedResponse<User>>;
}

export const userApiService: UserApiService = {
  authorization: async ({ username, password }, params) => {
    return await httpService.post(`/login`, { username, password }, params);
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
};
