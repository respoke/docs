: ${baseURL:="https://api.respoke.io"}

: ${appSecret:?"appSecret required"}
: ${appId:?"appId required"}
: ${endpointId:?"endpointId required"}
: ${ttl:?"ttl required"}
: ${roleId:?"roleId required"}

curl -X POST -H 'App-Secret: '$appSecret -H 'Content-type: application/json' \
-d '{"appId": "'$appId'", "endpointId": "'$endpointId'", "ttl": '$ttl', "roleId": "'$roleId'" }' $baseURL/v1/tokens
