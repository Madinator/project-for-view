import {
  APIControllers,
  APIControllersMethods,
  userApiService,
} from '@services/api/users';
import { tokenService } from '@services/local-storage/storage.service';
import { doRequestAPI, normalizeRoleMethods } from '@services/stores/helpers';
import { FetchState } from '@services/stores/type';

import routerStore from '../routerStore';
import { syncUserInfo } from './syncUserInfo';

export class AuthStore {
  fetchState: FetchState = 'initial';
  userInfo: IAuthStore.UserInfo | null = null;

  get isLoading(): boolean {
    return this.fetchState === 'loading';
  }

  get isAuth(): boolean {
    return !!this.userInfo?.ID;
  }


  setFetchState = (s: FetchState) => {
    this.fetchState = s;
  };

  constructor() {
    makeAutoObservable(this);
    reaction(() => this.userInfo, syncUserInfo);
  }

  login = async ({ username, password }: { username: string; password: string }) => {
    const { error } = await doRequestAPI({
      reqFunc: async () => {
        return await userApiService.authorization({ username, password });
      },
      onLoading: (v) => {
        this.setFetchState(v);
      },
      onLoad: (v) => {
        const { token, refresh_token } = v || {};
        if (token) {
          tokenService.setToken(token);
          tokenService.setRefreshToken(refresh_token);
        }
      },
      onErrorMessage: { message: 'Something went wrong' },
    });
  };


  logout = () => {
    tokenService.clearToken();
    tokenService.clearRefreshToken();
    routerStore.replace('/login');
  };

}

const authStore = new AuthStore();

export default authStore;
function makeAutoObservable(arg0: any) {
  throw new Error('Function not implemented.');
}

function reaction(arg0: () => import("./type").UserInfo | null, syncUserInfo: (data: any) => void) {
  throw new Error('Function not implemented.');
}

