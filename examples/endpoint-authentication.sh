: ${baseURL:="https://api.respoke.io"}

: ${appSecret:?"appSecret required"}
: ${appId:?"appId required"}
: ${endpointId:?"endpointId required"}
: ${roleId:?"roleId required"}

body='{
    "appId": "'$appId'",
    "endpointId": "'$endpointId'",
    "ttl": 3600,
    "roleId": "'$roleId'"
}'

tokenRequest=$(curl -s -X POST \
    -H "App-Secret: $appSecret" -H 'Content-type: application/json' \
    -d "$body" $baseURL/v1/tokens)

# Extract the tokenId from the returned JSON
tokenId=$(expr "$tokenRequest" : '.*"tokenId": *"\(.*\)"')

body='{ "tokenId": "'$tokenId'" }'

curl -X POST -H 'Content-type: application/json' \
    -d "$body" $baseURL/v1/session-tokens

# {
#     "message": "Authorization successful",
#     "token": "FB311719-D2F0-48D4-9A51-69CCE09F1C01"
# }
