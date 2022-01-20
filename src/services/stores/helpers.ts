import { FetchState } from '../stores/type';
import { isNetworkError } from '../../utils/helpers';
import { AxiosError } from 'axios';


export interface IDoRequestAPI<T = any> {
  onLoad?: (v: T) => void;
  reqFunc: () => Promise<TypedResponse<T>>;
  onError?: (v: AxiosError & { response: any }) => void;
  onLoadMessage?: string;
  onErrorMessage?: {
    message?: string;
    callback?: (v: Error & { response: any }) => void;
  };
  onLoading?: (v: FetchState) => void;
}


export const doRequestAPI = async <T>({
  reqFunc,
  onLoad,
  onError,
  onLoadMessage,
  onErrorMessage,
  onLoading,
}: IDoRequestAPI<T>): Promise<any> => {
  let error;
  const _onLoading = (v: FetchState) => onLoading && onLoading(v);

  _onLoading('loading');
  try {
    const response = await reqFunc();
    console.log(response, '|||response|||');
    // if (response.error_code) {
    //   throw {
    //     error_code: response.error_code,
    //     error_desc: response.error_desc,
    //   };
    // }
    onLoad && onLoad(response.data);

    _onLoading('success');
  } catch (e: unknown) {
    console.log(e, '|||REQ ERROR');
    error = e;
    _onLoading('error');
    if (isNetworkError(error.toString())) {
      return;
    } else {
      console.debug(error.response?.data ?? error, `|||API REQ ERROR|||`);

      onError && onError(error);

      if (onErrorMessage) {
        let message;

        if (onErrorMessage.callback) {
          message = onErrorMessage.callback(error);
        } else {
          message = `${onErrorMessage?.message ?? 'Error'}: ${
            error?.response?.data?.message?.text ??
            error?.response?.data?.message ??
            error
          }`;
        }
      }
    }
  }

  return { error, errorStatus: error?.response?.status };
};
