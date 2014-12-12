: ${baseURL:="https://api.respoke.io/v1"}

: ${adminToken:?"adminToken required"}

body='{
    "name": "New App",
    "description": "New app description."
}'

curl -X POST -H "Admin-Token: $adminToken" -H 'Content-type: application/json' \
    -d "$body" $baseURL/apps

# {
#     "name": "New App",
#     "description": "New app description.",
#     "accountId": "9628FFD0-54E8-402C-A979-368B03EC63D9",
#     "locked": false,
#     "developmentMode": false,
#     "id": "2e5f9f86-807c-4dc6-922b-4a8d396808f8",
#     "secret": "4f35f1cc-475a-4d2d-80ab-d3455d6ce248",
#     "createdAt": "2014-12-12T16:44:35.038Z",
#     "updatedAt": "2014-12-12T16:44:35.038Z"
# }
