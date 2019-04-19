import axios from 'axios'
import qs from 'qs';

const requestTimeout = 15000;
let Authorization = localStorage.getItem('Authorization')
// 创建axios实例
const service = axios.create({
  baseURL: 'https://shequgo.shop/web/', // api的base_url
  timeout: requestTimeout, // 请求超时时间
  withCredentials: true,
  Headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Authorization
  }
});
//拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(response => {
  let res = response.data
  return res
})
export default service