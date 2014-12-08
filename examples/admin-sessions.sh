: ${baseURL:="https://api.respoke.io/v1"}

: ${username:?"username required"}
: ${password:?"password required"}

body='{
    "username":  "'$username'",
    "password": "'$password'"
}'

curl -X POST -H 'Content-type: application/json' -d "$body" $baseURL/admin-sessions
