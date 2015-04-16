<?php

$data = array();
$baseURL = 'https://api.respoke.io/v1/tokens';
$appSecret = '28B061B9-A0D4-4E52-A0ED-EB6EA125F82A';

$data['endpointId'] = 'bobsmith'; // E.g. Pass this username when the user signs into your app
$data['appId'] = '34A9DDB9-D4AO-52AA-0ADE-EABEA521F2BA';
$data['roleId'] = '96070A0D-32B1-4B8C-9353-FE3E6A5E6C1D';
$data['ttl'] = 3600;
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

// { 
//    tokenId: '2976A526-BDD1-4478-A167-6A6F35B5AE82'
// }

?>
