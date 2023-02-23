import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseURL } from './api';
import { IS_DEV } from '@/utils/const';

interface CommonResponse<T = unknown> {
  code: number;
  msg: string;
  data: T;
  page: T;
}


export default <T = unknown>(
  options: AxiosRequestConfig & { service?: any }
): Promise<CommonResponse<T>> =>
  new Promise((resolve, reject) => {
    console.log('%c [ xxx ]', 'font-size:13px; background:pink; color:#bf2c9f;', IS_DEV());
    // 创建一个axios实例
    const obj = {
      baseURL: options.baseURL ? options.baseURL : IS_DEV() ? '/api' : baseURL,
      withCredentials: true,
      headers: options.headers ? options.headers : { 'Content-Type': 'application/json' },
      transformResponse: [],
      ...options,
      url: options.url,
      timeout: 3000,
    };
    const instance: AxiosInstance = axios.create(obj);
    // console.log(obj);
    //   拦截器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const c: any = config;
        c.headers['auth-tk'] = 'Bearer ' + localStorage.token;
        return c;
      }, // console.log(config);
      //   config.headers['token'] = this.$store.state.token
      (error: AxiosError) => reject(error) // console.log(error)
    );
    //  响应头拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        try {
          const responseBody = JSON.parse(response.request.response);

          // 未登录或登录失效，跳转登录页面
          if ('code' in responseBody && responseBody.code === 401) window.location.href = '/#/404';
        } catch (e) {
          return response;
        }
        return response;
      },

      (error: AxiosError) => {
        // 未登录或登录失效，跳转登录页面
        if (String(error).includes('401')) {
          window.location.href = '/#/404';
        }
        error;
      }
    );
    // 发送请求
    instance
      .request<any, T>(obj)
      .then((res: any) => {
        try {
          resolve(JSON.parse(res.request.response));
        } catch (e) {
          resolve(res.request.response);
        }
        //  resolve(JSON.parse(res.request.response));
      })
      .catch((err: any) => {
        reject(err);
      });
  });
