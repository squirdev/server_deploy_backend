import axios from 'axios' // 引入axios
import qs from 'qs' // 引入qs
import router from '@/router'
import APIUrl from './api.url' // 引入api.url.js
import { Toast } from "mint-ui";

// Axios 默认配置
axios.defaults.timeout = 50000 // 超时默认值
axios.defaults.baseURL = APIUrl.baseURL // 默认baseURL
axios.defaults.responseType = 'json' // 默认数据响应类型
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true // 允许跨域请求时携带凭证

// 🔹 HTTP 请求拦截器
axios.interceptors.request.use(
  (config) => {
    try {
      const lang = localStorage.getItem("language") || "zh-CN";
      config.headers["lang"] = lang;

      const userToken = localStorage.getItem("USERTOKEN");
      if (userToken) {
        config.headers["USERTOKEN"] = userToken;
        console.log("HEADER USERTOKEN:", userToken);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 HTTP 响应拦截器
axios.interceptors.response.use(
  (response) => {
    try {
      if (response.data && response.data.msg) {

        console.log("RESPONSE:", response);

        if (response.data.msg.includes("請先登錄") || response.data.msg.includes("請先登陸")) {
          Toast("您还未登录，请先登录");
          localStorage.removeItem("USERTOKEN");

          setTimeout(() => {
            router.replace({ path: "/login" });
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error processing response:", error);
    }

    return response;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);

export default axios;

/**
 * 封装 POST 方法
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {boolean} [out] - 是否打印请求日志（可选）
 * @returns {Promise}
 */
export function post(url, data = {}, out = false) {
  if (out) console.log("POST Request:", url, data);
  return axios.post(url, qs.stringify(data))
    .then(response => response.data)
    .catch(error => {
      console.error("POST Error:", error);
      return Promise.reject(error);
    });
}

/**
 * 封装 POST JSON 方法
 * @param {string} url - 请求地址
 * @param {object} data - JSON 格式请求数据
 * @param {boolean} [out] - 是否打印请求日志（可选）
 * @returns {Promise}
 */
export function postJson(url, data = {}, out = false) {
  if (out) console.log("POST JSON Request:", url, data);
  return axios.post(url, data)
    .then(response => response.data)
    .catch(error => {
      console.error("POST JSON Error:", error);
      return Promise.reject(error);
    });
}

/**
 * 封装 GET 方法
 * @param {string} url - 请求地址
 * @param {object} data - 请求参数
 * @param {boolean} [out] - 是否打印请求日志（可选）
 * @returns {Promise}
 */
export function get(url, data = {}, out = false) {
  if (out) console.log("GET Request:", url, data);
  return axios.get(url, { params: data })
    .then(response => response.data)
    .catch(error => {
      console.error("GET Error:", error);
      return Promise.reject(error);
    });
}
