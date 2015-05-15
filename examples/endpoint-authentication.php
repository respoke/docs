// composer require respoke/respoke

use Respoke\Client;

$client = new Respoke\Client([
    "appId" => "c10a2075-3f3d-466f-82f9-d2285e64c5d4",
    "appSecret" => "eb327e57-e766-49de-b801-ef612a70509e",
    "roleId" => "371F82D1-E4CE-4BB0-B2BB-79EA3497FC4F",
    "endpointId" => "spock@enterprise.com"
]);

$tokenId = $client->getTokenId();

// return the token to the front-end
json_encode(["token" => $tokenId]);