: ${baseURL:="https://api.respoke.io/v1"}

: ${adminToken:?"adminToken required"}
: ${appId:?"appId required"}

body='{
    "name": "New App",
    "description": "New app description."
}'

curl -X GET -H "Admin-Token: $adminToken" -H 'Content-type: application/json' \
    -d "$body" $baseURL/apps/$appId
