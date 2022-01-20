import { isJson } from '../../utils/helpers';

function mapSearchParams(q: Record<string, unknown>) {
  console.log(q, 'mapSearchParams');
  const query = q;
  const params = new URLSearchParams();
  for (const queryKey in query) {
    if (Object.prototype.hasOwnProperty.call(query, queryKey)) {
      if (Array.isArray(query[queryKey])) {
        const array = query[queryKey] as [];
        array.forEach((a) => {
          params.append(queryKey, a);
        });
      } else if (!!query[queryKey] || query[queryKey] === 0) {
        params.append(queryKey, query[queryKey] as string);
      }
    }
  }
  // console.log(params.toString(), 'mapSearchParams');
  return params;
}

async function responseAdapterFunc(response: TypedResponse): Promise<any> {
  try {
    if (response.ok) {
      return (await response.json()) as Record<string, any>;
    }
    const statusText = response.statusText;

    // convert non-2xx HTTP responses into errors:
    const error = new Error(statusText ?? response.toString()) as TypedError;
    let responseJ = { message: undefined };
    if (isJson(response)) {
      try {
        responseJ = await response.json();
      } catch (e) {
        alert(1);
        console.debug(e, '+____+');
      }
    }

    console.debug(responseJ, 'response.status');
    if (response.status === 404) {
      error.response = { message: responseJ.message ?? 'Не найдено', status: 404 };

      return Promise.reject(error);
    } else if (response.status === 403) {
      error.response = { message: responseJ.message ?? 'Недостаточно прав', status: 403 };

      return Promise.reject(error);
    } else if (response.status == 401) {
      error.response = { message: 'Вы не авторизованы', status: 401 };
      return Promise.reject(error);
    }
    if (response.status !== 500 && response.status !== 401) {
      error.response = 'что-то пошло не так, ошибка на сервере';
    } else {
      error.response =
        'что-то пошло не так.' + response.status
          ? `Статус: ${response.status}`
          : 'не определён';
    }
    return Promise.reject(error);
  } catch (e) {
    console.debug('response error:', e);
  }
}

export { mapSearchParams, responseAdapterFunc };
