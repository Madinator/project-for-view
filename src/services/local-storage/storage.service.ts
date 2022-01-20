import { isJson } from '@utils/helpers';

export const tokenKey = '_audio_control_t';
export const tokenRefreshKey = '_audio_control_tr';

export const storageService = {
  getItem: (key: string) => {
    const storage = localStorage.getItem(key);
    return isJson(storage) ? JSON.parse(storage) : null;
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  clearItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

export const tokenService = {
  getToken: (): string | null => {
    return storageService.getItem(tokenKey)?.v1;
  },
  setToken: (v1: string): void => {
    storageService.setItem(tokenKey, JSON.stringify({ v1 }));
  },
  getRefreshToken: (): string | null => {
    return storageService.getItem(tokenRefreshKey)?.v2;
  },
  setRefreshToken: (v2: string): void => {
    storageService.setItem(tokenRefreshKey, JSON.stringify({ v2 }));
  },
  clearRefreshToken: (): void => {
    storageService.clearItem(tokenRefreshKey);
  },
  clearToken: (): void => {
    storageService.clearItem(tokenKey);
  },
};
