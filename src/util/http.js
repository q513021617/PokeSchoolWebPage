import axios from 'axios' //引用axios
// axios 配置
axios.defaults.timeout = 50000;

axios.defaults.headers=[
  {'Content-Type': 'application/json'},
  {"access-control-allow-headers":"Accept,Referer,Host,Keep-Alive,User-Agent,X-Requested-With,Cache-Control,Content-Type,Cookie,TOKEN"},
  {'access-control-allow-origin':'*'},
  {"access-control-allow-methods":"GET, POST, PUT, DELETE"}
  ];



axios.interceptors.request.use(config => {
  //在发送请求之前做某事，比如说 设置loading动画显示

  return config
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
});

//添加响应拦截器
axios.interceptors.response.use(response => {
  //对响应数据做些事，比如说把loading动画关掉

  return response
}, error => {
  //请求错误时做些事
  return Promise.reject(error)
});






/**
 * fetch 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
  })
}
