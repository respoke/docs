# gem install ruby-respoke

require "respoke"
require "json"

client = Respoke::Client.new(
    app_secret: "eb327e57-e766-49de-b801-ef612a70509e"
)

tokenId = client.app_token(
    appId: "c10a2075-3f3d-466f-82f9-d2285e64c5d4", 
    roleId: "371F82D1-E4CE-4BB0-B2BB-79EA3497FC4F", 
    endpointId: "spock@enterprise.com"
)

# return the token to the front-end
{:token => tokenId}.to_json