: ${baseURL:="https://api.respoke.io/v1"}

: ${appSecret:?"appSecret required"}
: ${appId:?"appId required"}
: ${endpointId:?"endpointId required"}
: ${roleId:?"roleId required"}

body='{
    "appId": "'$appId'",
    "endpointId": "'$endpointId'",
    "roleId": "'$roleId'",
    "ttl": 3600
}'

# {
#    "appId": "34A9DDB9-D4AO-52AA-0ADE-EABEA521F2BA",
#    "endpointId": "bobsmith",
#    "roleId": "96070A0D-32B1-4B8C-9353-FE3E6A5E6C1D",
# }

tokenRequest=$(curl -s -X POST \
    -H "App-Secret: $appSecret" -H 'Content-type: application/json' \
    -d "$body" $baseURL/tokens)

# POST https://api.respoke.io/v1/tokens
# App-Secret: 28B061B9-A0D4-4E52-A0ED-EB6EA125F82A
# Content-Type: application/json

# Extract the tokenId from the returned JSON
tokenId=$(expr "$tokenRequest" : '.*"tokenId": *"\(.*\)"')

body='{ "tokenId": "'$tokenId'" }'

curl -X POST -H 'Content-type: application/json' \
    -d "$body" $baseURL/session-tokens

# {
#     "tokenId": "FB311719-D2F0-48D4-9A51-69CCE09F1C01"
# }
