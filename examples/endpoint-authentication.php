<?php

// Save to authentication.php, then run with:
// php authentication.php

$baseURL = "https://api.respoke.io/v1";

$endpointId ="spock@enterprise.com";
$appId = "c10a2075-3f3d-466f-82f9-d2285e64c5d4";
$appSecret = "eb327e57-e766-49de-b801-ef612a70509e";
$roleId ="371F82D1-E4CE-4BB0-B2BB-79EA3497FC4F";

$json = array();

$json["appId"] = $appId;
$json["endpointId"] = $endpointId;
$json["roleId"] = $roleId;
$json["ttl"] = 3600;

$body = json_encode($json);

// Make a call to /tokens to get a tokenId
$tokenRequest = array(
    "http" => array(
        "header"  => "Content-type: application/json\r\n" .
            "App-Secret: " . $appSecret . "\r\n",
        "method"  => "POST",
        "content" => $body
    ),
);

$content  = stream_context_create($tokenRequest);
$tokenResponse = json_decode(file_get_contents(($baseURL . "/tokens"), false, $content), true);
echo(var_dump($tokenResponse));

// Extract the tokenId from the tokenResponse
$tokenId = $tokenResponse["tokenId"];

$json = array();

$json["tokenId"] = $tokenId;

$body = json_encode($json);

// Make a call to /session-tokens, passing the tokenId from /tokens
// to get the temporary session token
$sessionTokenRequest = array(
    "http" => array(
        "header"  => "Content-type: application/json\r\n" .
            "App-Secret: " . $appSecret . "\r\n",
        "method"  => "POST",
        "content" => $body
    ),
);

$content  = stream_context_create($sessionTokenRequest);
$sessionTokenResponse = json_decode(file_get_contents($baseURL . "/session-tokens", false, $content), true);
echo(var_dump($sessionTokenResponse));

// {
//    "message": "Authorization successful",
//    "token": "B89F8F35-709F-4022-8766-37E6DEFFD39E"
// }

// Extract the token from the sessionTokenResponse
// Connect your Respoke client using this token
$token = $sessionTokenResponse["token"];
echo("{ token: $token }");
?>