
username="<%= config.username %>"
password="<%= config.password.replace(/(["\s'$`\\])/g,'\\$1') %>"
appId="<%= config.appId %>"
appSecret="<%= config.appSecret %>"
endpointId="<%= config.endpointId %>"
roleId="<%= config.roleId %>"
newRoleId="<%= newRole.id %>"
newRoleName="<%= newRole.name %>"
adminToken="<%= tokens.adminToken %>"
appToken="<%= tokens.appToken %>"

<%= code %>
