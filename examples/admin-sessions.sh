: ${baseURL:="https://api.respoke.io"}

: ${username:?"username required"}
: ${password:?"password required"}

body='{
    "username":  "'$username'",
    "password": "'$password'"
}'

curl -X POST -H 'Content-type: application/json' -d "$body" $baseURL/v1/admin-sessions
