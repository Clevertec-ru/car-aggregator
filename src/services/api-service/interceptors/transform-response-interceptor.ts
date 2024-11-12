import { type AxiosResponse, isCancel } from 'axios';

import { ApiClient } from '..';

export function transformResponseInterceptor(this: ApiClient) {
  const onResponse = (response: AxiosResponse) => response?.data;

  const onResponseError = (error: any) => {
    if (isCancel(error)) {
      throw error;
    }
    // Axios Network Error & Timeout error не имеют response свойства
    // https://github.com/axios/axios/issues/383
    const errorResponse = error.response || {
      status: error.code,
      statusText: error.message,
      data: error.data,
    };

    const errorHandlers = this.handlers.get('error') || [];
    errorHandlers.forEach((handler: any) => {
      handler(errorResponse);
    });

    return this.throwApiError(errorResponse);
  };

  this.api.interceptors.response.use(onResponse, onResponseError);
}
