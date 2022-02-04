import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { userApiService } from '../../api/users';
import { tokenService } from '../../local-storage/storage.service';
import { doRequestAPI } from '../../stores/helpers';

export const authStore = defineStore("authStore", {
    state: () => ({
        numberPhone: '',
        password: '',
        isRegister: true,
        response: { 
          error: true,
          text: 'Something went wrong'
        }
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
              let status = v.response.status; 

              if(status === 403) {
                this.response = { error: true, text: "Введен неверный пароль"};            
              }
          
              if(status === 400) {
                this.response = { error: true, text: "На этот номер не зарегистрировано ОСИ"}; 
              }
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
          }
        });
      }
    }
})