: ${baseURL:="https://api.respoke.io"}

#: ${tokenId?="tokenId required"}

#curl -X POST -H 'App-Token: '$appToken -H 'Content-type: application/json' -d '{"tokenId": "'$tokenId'"}' $baseURL/v1/session-tokens
