import { storageService } from '@services/local-storage/storage.service';
export const userDataStorageKey = '_audio_control_u';

export const initialUserInfo = (() => {
  const localUserInfo = storageService.getItem('_audio_control_u');

  if (localUserInfo) {
    storageService.setItem(userDataStorageKey, JSON.stringify(localUserInfo));
  }
  return localUserInfo;
})();
export const getUserInfoFromStorage = () =>
  storageService.getItem(userDataStorageKey);

export let userInfo = initialUserInfo;

/**
 * syncUserInfo for http
 *
 * @export
 * @param {IUserStore.UserInfo} data
 */
export function syncUserInfo(data) {
  userInfo = data;
}
