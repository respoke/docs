: ${baseURL:="https://api.respoke.io"}

: ${username:?"username required"}
: ${password:?"password required"}

curl -X POST -H 'Content-type: application/json' -d '{"username":  "'$username'", "password": "'$password'"}' $baseURL/v1/admin-sessions
