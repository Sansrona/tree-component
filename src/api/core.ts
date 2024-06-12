import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class BasicRest {
  protected constructor(protected readonly endpoint: AxiosInstance) {}

  protected async patchRequest<T = never>(url: string, params?: object) {
    return BasicRest.dataFrom<T>(await this.endpoint.patch<T>(url, params));
  }

  protected async putRequest<T = never>(url: string, params?: object) {
    return BasicRest.dataFrom<T>(await this.endpoint.put<T>(url, params));
  }

  protected async postRequest<T = never>(
    url: string,
    params?: object,
    configs?: AxiosRequestConfig<any>
  ) {
    return BasicRest.dataFrom<T>(
      await this.endpoint.post<T>(url, params, configs)
    );
  }

  protected async getRequest<T = never>(
    url: string,
    params?: AxiosRequestConfig<any>
  ) {
    return BasicRest.dataFrom<T>(await this.endpoint.get<T>(url, params));
  }

  protected async deleteRequest<T = never>(url: string) {
    return BasicRest.dataFrom<T>(await this.endpoint.delete<T>(url));
  }

  private static async dataFrom<T>(request: AxiosResponse<T>) {
    return request;
  }
}
