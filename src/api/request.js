import axios from 'axios'
import qs from 'qs';
import {
  Message,
} from 'element-ui';

const requestTimeout = 15000;
let Authorization = localStorage.getItem('Authorization')
window.console.log(Authorization, 'Authorization')
// 创建axios实例
const service = axios.create({
  baseURL: 'https://shequgo.shop/web/', // api的base_url
  timeout: requestTimeout, // 请求超时时间
  withCredentials: true,
  headers: {
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
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code === 1) {return res}
    else if (res.code === 401) {
      window.console.log('dd',res.code)
      // router.push({ path:'/login' })
      window.location.hash = '/login'
      Message({
        message: res.data,
        type: 'error'
      });
      location.reload();
    }
    else {
      Message({
        message: res.data,
        type: 'error'
      });
    }
  },
  error => {
    const errorOuter = error.toString();
    if (errorOuter === `Error: timeout of ${requestTimeout}ms exceeded`) {
      Message({
        message: '连接超时，请检查网络连接',
        type: 'error'
      });
    } else if (errorOuter === 'Error: Network Error') {
      Message({
        message: '网络异常，请检查网络连接',
        type: 'error'
      });
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
  }
)
export default service