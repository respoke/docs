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
// Connect your Respoke client using this token
$tokenId = $tokenResponse["tokenId"];
echo("{ token: $tokenId }");
?>
