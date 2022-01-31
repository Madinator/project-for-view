import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { userApiService } from '../../api/users';
import { tokenService } from '../../local-storage/storage.service';
import { doRequestAPI } from '../../stores/helpers';

export const authStore = defineStore("authStore", {
    state: () => ({
        numberPhone: '',
        password: '',
        status: 200,
        isRegister: true,
    }),
    actions: { 
      async login() {
        const { error } = await doRequestAPI({
            reqFunc: async () => {
              return await userApiService.authorization({ numberPhone : this.numberPhone, password : this.password });
            },
            onLoad: (v) => {
              const { token, refresh_token } = v || {};
              if (token) {
                tokenService.setToken(token);
                tokenService.setRefreshToken(refresh_token);
              }
            },
            onError: (v: AxiosError & { response: any }) => {
              this.status = v.response.status;   
            },
          });
      },
      logout() {
          tokenService.clearToken();
          tokenService.clearRefreshToken();
      },
      async RequestSmsCodeWeb() {
        const { error } = await doRequestAPI({
          reqFunc: async () => {
            return await userApiService.requestSMSCode({ numberPhone : this.numberPhone, isRegister : this.isRegister });
          },
          onLoad: (v) => {
            const { token, refresh_token } = v || {};
            if (token) {
              tokenService.setToken(token);
              tokenService.setRefreshToken(refresh_token);
            }
          },
          onError: (v: AxiosError & { response: any }) => {
            this.status = v.response.status;   
          },
        });
      }
    }
})