/*! create time: 2019-1-8 13:16:44 */

// ajax
import ajax from '../ajax'

/**
 * GET_TITLE
 * @type {string}
 */
export const GET_TITLE = '/menu/getTitle'

/**
 * getTitle
 * @param data
 * @returns {promise}
 */
export const getTitle = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: GET_TITLE
  })
}
