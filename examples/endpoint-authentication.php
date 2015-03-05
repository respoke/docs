<?php

$data = array();
$data['appId'] = $appId;
$data['endpointId'] = $endpointId;
$data['roleId'] = $roleId;
$data['ttl'] = 86400;
$json = json_encode($data);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n" .
            "App-Secret: " . $appSecret . "\r\n",
        'method'  => 'POST',
        'content' => $json,
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($baseURL, false, $context);

echo($result);

// { tokenId: 'XXXX-XXXXXX-XXXXXX-XXXX' }

?>