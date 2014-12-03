
username="<%= config.username %>"
password="<%= config.password.replace(/(["\s'$`\\])/g,'\\$1') %>"
appId="<%= config.appId %>"
appSecret="<%= config.appSecret %>"
roleId="<%= config.roleId %>"
endpointId="<%= config.endpointId %>"

<%= code %>
