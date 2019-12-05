const _ = require('lodash')
module.exports = _.template(`
import axios from 'axios'
<%_.each(model, function(items, name){%>
  /**
   * <%=items.title%> api
   * @module base/api/<%=items.name%>
   * @ author chengweituo
   */
  export const <%=items.state%> = '<%=url%>' + '<%=items.path%>'
  export function <%=items.name%> (data) {
     let dataType = '<%=items.options.method%>' === 'get' ? 'params' : 'data';
     return axios({
        method: '<%=items.options.method%>',
        [dataType]: data,
        url: <%=items.state%>
     });
  }
<%})%>
`)
