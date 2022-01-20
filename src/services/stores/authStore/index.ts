import { defineStore } from "pinia";
import { userApiService } from '../../api/users';
import { tokenService } from '../../local-storage/storage.service';
import { doRequestAPI } from '../../stores/helpers';

export const authStore = defineStore("authStore", {
    state: ()=> ({
      username: '',
      password: '',
    }),
    actions: { 
      async login() {
          const { error } = await doRequestAPI({
              reqFunc: async () => {
                return await userApiService.authorization({ username : this.username, password : this.password });
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
      },
      logout() {
          tokenService.clearToken();
          tokenService.clearRefreshToken();
      }
    }
})