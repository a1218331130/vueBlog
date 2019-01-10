import axios from 'axios'

const config = {
  headers: null,
  timeout: 0,
  withCredentials: true,
  responseType: 'json',
  maxContentLength: -1
}

const service = axios.create(config)

// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

export default service
