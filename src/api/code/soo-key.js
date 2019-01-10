/*! create time: 2019-1-8 13:16:44 */

// ajax
import ajax from '../ajax'

/**
 * GET_MENU
 * @type {string}
 */
export const GET_MENU = '/menu/getMenu'

/**
 * getMenu
 * @param data
 * @returns {promise}
 */
export const getMenu = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: GET_MENU
  })
}

/**
 * GET_SCRIPT_PEPLE
 * @type {string}
 */
export const GET_SCRIPT_PEPLE = 'xtztc/info/key12'

/**
 * getScriptPeple
 * @param data
 * @returns {promise}
 */
export const getScriptPeple = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: GET_SCRIPT_PEPLE
  })
}
