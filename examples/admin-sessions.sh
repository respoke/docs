: ${baseURL:="https://api.respoke.io/v1"}

: ${username:?"username required"}
: ${password:?"password required"}

body='{
    "username":  "'$username'",
    "password": "'$password'"
}'

curl -X POST -H 'Content-type: application/json' -d "$body" $baseURL/admin-sessions

# {
#     "message":"Authorization successful",
#     "token":"22153294-EB54-48FD-9007-6791126155BB"
# }
