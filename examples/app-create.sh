: ${baseURL:="https://api.respoke.io/v1"}

: ${adminToken:?"adminToken required"}

body='{
    "name": "New App",
    "description": "New app description."
}'

curl -X POST -H "Admin-Token: $adminToken" -H 'Content-type: application/json' \
    -d "$body" $baseURL/apps
