import { User } from '@services/api/users';

import { AuthStore as StoreModel } from './index';

export as namespace IAuthStore;

export type AuthStore = StoreModel;

export interface UserInfo extends User {}
