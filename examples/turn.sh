: ${baseURL:="https://api.respoke.io/v1"}

: ${appToken:?"appToken required"}

curl -X POST -H "App-Token: $appToken" -H 'Content-type: application/json' \
    $baseURL/turn

# {
#     "username": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.0000000000",
#     "password": "XXXXXXXXXXXX+XXXXXXXXXXXXXX=",
#     "ttl": 60,
#     "uris": [
#         "turn:54.193.20.11:3478?transport=udp"
#     ]
# }
