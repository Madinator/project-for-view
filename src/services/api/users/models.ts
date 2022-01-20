
type LoginResponse = {
  expires: string;
  refresh_token: string;
  token: string;
};

type RefreshResponse = Omit<LoginResponse, 'refresh_token'>;

type APIControllers =
  | 'users';

type APIControllersMethods =
  | 'view'
  | 'list'
  | 'create'
  | 'update'
  | 'delete'
  | 'remoderate'
  | 'methods'
  | 'change_cabinet';

type UserRole = {
  access_level: number;
  ID: number;
  name: string;
  methods: { [K in APIControllers]?: string[] };
};

type UsersListResponse = { users: User[] };

type User = {
  ID: number;
  username: string;
};

type UserCreateDTO = {
  username: string;
};
type UserUpdateDTO = {
  username: string;
  password: string;
};

export type {
  APIControllers,
  APIControllersMethods,
  LoginResponse,
  RefreshResponse,
  User,
  UserCreateDTO,
  UserRole,
  UsersListResponse,
  UserUpdateDTO,
};
