: ${baseURL:="https://api.respoke.io/v1"}

body='{
    "endpointId": "destination-endpoint-id",
    "message": "Hello world!"
}'

curl -X POST -H "App-Token: $appToken" -H 'Content-type: application/json' \
    -d "$body" $baseURL/messages
