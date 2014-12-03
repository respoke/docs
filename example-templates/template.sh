
username="<%= config.username %>"
password="<%= config.password.replace(/(["\s'$`\\])/g,'\\$1') %>"

<%= code %>
