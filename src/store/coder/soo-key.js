/*! build time: 2019-1-8 16:20:44 */

// GET_MENU, GET_SCRIPT_PEPLE
import {
  GET_MENU,
  GET_SCRIPT_PEPLE
} from '../types'
import axios from "axios"

// store module
export default {
  actions: {
    [GET_MENU]({
        commit
      },
      data = {}) {
      return new Promise(function (resolve, reject) {
        axios.post('/menu/getMenu', data).then(data => {
          resolve(data)
        })
      });
    },
    [GET_SCRIPT_PEPLE]({
        commit
      },
      data = {}) {
      return new Promise(function (resolve, reject) {
        axios.post('xtztc/info/key12', data).then(data => {
          resolve(data)
        })
      });
    }
  }
}
