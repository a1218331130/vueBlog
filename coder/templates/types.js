const _ = require('lodash')
module.exports = _.template(`
<%_.each(types, function(items, name){%>
// <%=name%>
  <%_.each(items, function(item){%>
     export const <%=item.name%> = '<%=item.name%>'
  <%})%>
<%})%>
`)
