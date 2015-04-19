# Save to authentication.sh, then run with:
# sh authentication.sh

: ${baseURL:="https://api.respoke.io/v1"}

: ${endpointId:="spock@enterprise.com"}
: ${appId:="c10a2075-3f3d-466f-82f9-d2285e64c5d4"}
: ${appSecret:="eb327e57-e766-49de-b801-ef612a70509e"}
: ${roleId:="371F82D1-E4CE-4BB0-B2BB-79EA3497FC4F"}

body='{
    "appId": "'$appId'",
    "endpointId": "'$endpointId'",
    "roleId": "'$roleId'",
    "ttl": 3600
}'

# Make a call to /tokens to get a tokenId
tokenResponse=$(curl -s -X POST \
    -H "App-Secret: $appSecret" -H 'Content-type: application/json' \
    -d "$body" $baseURL/tokens)


# Extract the tokenId from the tokenResponse
tokenId=$(expr "$tokenResponse" : '.*"tokenId": *"\(.*\)"')

body='{ "tokenId": "'$tokenId'" }'

# Make a call to /session-tokens, passing the tokenId from /tokens
# to get the temporary session token
curl -X POST -H 'Content-type: application/json' \
    -d "$body" $baseURL/session-tokens

# {
#    "message": "Authorization successful",
#    "token": "B89F8F35-709F-4022-8766-37E6DEFFD39E"
# }