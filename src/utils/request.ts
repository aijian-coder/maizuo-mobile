import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { showDialog } from "vant";

/* 
1.创建axios实例对象
2.请求拦截
3.响应拦截
4.导出请求
*/

/* 
导出相应方法
*/

//实例化axios
const request = axios.create({
  baseURL: "/api",
  timeout: 3000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const resp = response.data;

    // 做业务状态码的判断
    if (resp.status !== 0) {
      // 弹窗提示
      // alert(resp.msg);
      showDialog({ message: resp.msg });
      return Promise.reject(resp);
    } else {
      return resp.data;
    }
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * 一个get模式调用接口的方法
 * @param apiCode 请求头的参数
 * @param params 调接口要穿的参数
 */
export function httpGet<T = any>(apiCode: string, params?: any) {
  const headers = {
    "X-Host": apiCode,
  };
  return request<T, T>({
    url: `/gateway?${apiCode}`,
    method: "GET",
    params,
    headers,
  });
}

/**
 *
 * @param apiCode 请求头的参数
 * @param data 调接口要穿的参数
 * @param config 请求配置 可选
 */
export function httpPost<T = any>(
  apiCode: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  const headers = {
    "X-Host": apiCode,
    ...config?.headers,
  };
  return request<T, T>({
    url: `/gateway?${apiCode}`,
    method: "POST",
    data,
    headers,
  });
}

export default request;
