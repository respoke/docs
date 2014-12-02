: ${baseURL:="https://api.respoke.io"}

: ${adminToken:?"adminToken required"}
: ${name:?"name required"}
: ${description:?"description required"}

curl -X POST -H 'Admin-Token: '$adminToken -H 'Content-type: application/json' \
-d '{"name": "'$name'", "description": "'$description'" }' \
$baseURL/v1/apps
