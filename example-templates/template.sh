
username="<%= config.username %>"
password="<%= config.password.replace(/(["\s'$`\\])/g,'\\$1') %>"
appId="<%= config.appId %>"
appSecret="<%= config.appSecret %>"
roleId="<%= config.roleId %>"
newRoleId="<%= newRole.id %>"
newRoleName="<%= newRole.name %>"
endpointId="<%= endpointId %>"

<%= code %>
