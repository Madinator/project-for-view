import { AxiosResponse } from 'axios';

type FetchState = 'initial' | 'loading' | 'success' | 'error';

type ReqError = { error: boolean; errorStatus?: number };

interface TypedResponse<T = any> extends AxiosResponse<T> {}

interface Option {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}
