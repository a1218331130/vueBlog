import axios from 'axios'
import router from '../router'
/**
 * 在请求发送数据之前，对发送数据进行转换
 */
axios.interceptors.request.use(function (config) {
    // 在这里实现对请求前的处理
    let token = localStorage.getItem("token");
    if(token !== 'null'){
        config.headers.token = token;
        // config.headers.Authorization = `token ${sessionStorage.getItem('token')}`
    }
    // console.log(config,'configconfigconfigconfigconfig');
    return config
  })
  
  /**
   * 在ajax接收响应数据之前，进行判断是否响应未登录、如果未登录重定向到登录页面
   */
  axios.interceptors.response.use(function (res) {
    // 在这里实现响应后的处理
    console.log(res.data.status,'resresresresresresres');
    if(res.data.status === 0) {
        router.replace({
            path: 'login'
        })
    }
    return res
  })

  export default axios