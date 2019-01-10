/*! build time: 2019-1-8 16:20:44 */

// GET_TITLE
import {
  GET_TITLE
} from '../types'
import axios from "axios"

// store module
export default {
  actions: {
    [GET_TITLE]({
        commit
      },
      data = {}) {
      return new Promise(function (resolve, reject) {
        axios.post('/menu/getTitle', data).then(data => {
          resolve(data)
        })
      });
    }
  }
}
