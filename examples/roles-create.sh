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

# {
#     "appId": "511b443f-3890-4a89-8740-de42f85765ef",
#     "name": "cf4a2fbb-5bd3-41e9-8407-b0edd450be42",
#     "groups": {
#         "list": true,
#         "*": {
#             "subscribe":true,
#             "unsubscribe":true,
#             "create":true,
#             "destroy":true,
#             "publish":true,
#             "getsubscribers":true
#         }
#     },
#     "events": {
#         "subscribe":false,
#         "unsubscribe":false
#     },
#     "mediaRelay": false,
#     "accountId":"9628FFD0-54E8-402C-A979-368B03EC63D9",
#     "pstnOut": [],
#     "callerIds": [],
#     "id": "B4E3CCF8-0712-4CF8-B8E6-FA40F5E9CC30",
#     "createdAt":"2014-12-12T16:56:28.957Z",
#     "updatedAt":"2014-12-12T16:56:28.957Z"
# }
