import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { transformResponseInterceptor } from './interceptors';
import { unref } from 'vue';

export class ApiClient {
  protected api: AxiosInstance;

  protected handlers: Map<string, any>;

  constructor(axiosConfig: AxiosRequestConfig) {
    this.handlers = new Map();

    this.api = axios.create(axiosConfig);

    transformResponseInterceptor.call(this);
  }

  get(
    url: string,
    params: any = {},
    requestConfig: AxiosRequestConfig<any> = {}
  ): Promise<any> {
    return this.api({
      method: 'get',
      url,
      params: unref(params),
      ...requestConfig,
    });
  }

  post<Response = any>(
    url: string,
    data: any = {},
    requestConfig: AxiosRequestConfig<any> = {}
  ): Promise<Response> {
    return this.api({
      method: 'post',
      url,
      data: unref(data),
      ...requestConfig,
    });
  }

  put(
    url: string,
    data: any = {},
    requestConfig: AxiosRequestConfig<any> = {}
  ): Promise<any> {
    return this.api({
      method: 'put',
      url,
      data: unref(data),
      ...requestConfig,
    });
  }

  delete(
    url: string,
    data: any = {},
    requestConfig: AxiosRequestConfig<any> = {}
  ): Promise<any> {
    return this.api({
      method: 'delete',
      url,
      data: unref(data),
      ...requestConfig,
    });
  }

  throwApiError(error: any) {
    console.error(error);
  }
}
