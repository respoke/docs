: ${baseURL:="https://api.respoke.io/v1"}

: ${appSecret:?"appSecret required"}
: ${appId:?"appId required"}

curl -X GET -H "App-Secret: $appSecret" -H 'Content-type: application/json' \
    $baseURL/apps/$appId

# {
#     id: '511b443f-3890-4a89-8740-de42f85765ef',
#     accountId: '9628FFD0-54E8-402C-A979-368B03EC63D9',
#     name: 'docs-example-runner',
#     description: 'App for running docs examples.',
#     locked: false,
#     permittedDomains: null,
#     developmentMode: false,
#     secret: '<redacted>',
#     createdAt: '2014-12-03T21:12:59.000Z',
#     updatedAt: '2014-12-03T21:35:35.000Z'
# }
