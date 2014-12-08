: ${baseURL:="https://api.respoke.io/v1"}

: ${appToken:?"appToken required"}

curl -X POST -H "App-Token: $appToken" -H 'Content-type: application/json' \
    $baseURL/turn
