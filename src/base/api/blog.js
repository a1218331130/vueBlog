
import axios from 'axios'

  /**
   * 获取首页数据 api
   * @module base/api/getNewList
   * @ author chengweituo
   */
  export const GETNEWLIST = 'http://localhost:8080' + '/menu/getNewList'
  export function getNewList (data) {
     let dataType = 'post' === 'get' ? 'params' : 'data';
     return axios({
        method: 'post',
        [dataType]: data,
        url: GETNEWLIST
     });
  }

