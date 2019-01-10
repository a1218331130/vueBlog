import pathToRegex from 'path-to-regexp'
import axios from './axios'
import { getHost, appendQuery } from './url'

// 编译过的url缓存
let pathToRegexCaches = {}

const defaultConfig = {
  url: null,
  method: 'get',
  params: null, // 这里不是查询参数，是path参数，如: /api/user/:id
  data: null // get head delete请求是查询参数，其他类型是post数据
}

/**
 * 构建通用适配处理ajax返回数据Promise
 * @param http
 * @returns {Promise}
 */
function createPromise (http) {
  return new Promise(function (resolve, reject) {
    http.then(function (res) {
      if (res.data) {
        if (Number.parseInt(res.data.code) === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    }).catch(function (res) {
      reject(res)
    })
  })
}

/**
 * ajax 函数
 * @param options
 * @returns {*}
 */
export default function (options) {
  let config = Object.assign({}, defaultConfig, options || {})
  if (!config.url) {
    throw new Error('ajax url is required!')
  }
  let compileCache = pathToRegexCaches[config.url]
  let host = getHost(config.url)
  if (!compileCache) {
    // 先排除host段，因为host段的端口号与参数写法有冲突
    compileCache = pathToRegexCaches[config.url] = pathToRegex.compile(config.url.replace(host, ''))
  }
  // 补回host段
  let url = host + compileCache(config.params)
  let type = config.method.toLowerCase()
  let data = config.data
  debugger;
  delete config.url
  delete config.type
  delete config.data
  delete config.params
  
  return ['get', 'head', 'delete'].includes(type)
    ? createPromise(axios[type](appendQuery(url, data), config))
    : createPromise(axios[type](url, data, config))
}

/**
 * axios 数据适配函数
 * @param transformer 转换函数
 * @param method 方法名称
 * @param postData 请求的参数对象
 * @param params 请求的url参数对象
 * @returns {Function}
 */
export function transformHandler (transformer, method, postData, params) {
  return function (data) {
    let json = JSON.parse(data)
    return transformer(json, method, postData, params)
  }
}
