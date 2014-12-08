: ${baseURL:="https://api.respoke.io/v1"}

: ${appId:?"appId required"}
: ${newRoleId:?"newRoleId required"}
: ${newRoleName:?"newRoleName required"}

body='{
    "appId": "'$appId'",
    "name": "'$newRoleName'",
    "id": "'$newRoleId'",
    "mediaRelay": false,
    "events": {
        "subscribe": false, "unsubscribe": false
    },
    "groups": {
        "list": true,
        "*": {
            "subscribe": true,
            "unsubscribe": true,
            "create": true,
            "destroy": true,
            "publish": true,
            "getsubscribers": true
        }
    }
}'

curl -X POST -H "App-Secret: $appSecret" -H 'Content-type: application/json' \
    -d "$body" $baseURL/roles
