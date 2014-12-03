: ${baseURL:="https://api.respoke.io"}

: ${appSecret:?"appSecret required"}
: ${appId:?"appId required"}
: ${endpointId:?"endpointId required"}
: ${roleId:?"roleId required"}

curl -X POST -H 'App-Secret: '$appSecret -H 'Content-type: application/json' \
-d '{"appId": "'$appId'", "endpointId": "'$endpointId'", "ttl": 30, "roleId": "'$roleId'" }' \
$baseURL/v1/tokens
