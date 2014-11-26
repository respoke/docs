: ${baseURL:="https://api.respoke.io"}

: ${appToken:?"appToken required"}

curl -X POST -H "App-Token: ${appToken}" -H 'Content-type: application/json' $baseURL/v1/turn
