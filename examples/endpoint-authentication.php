<?php

$data = array();
$data['appId'] = $appId;
$data['endpointId'] = $endpointId;
$data['roleId'] = $roleId;
$data['ttl'] = 86400;
$json = json_encode($data);
$ch = curl_init($baseURL);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'App-Secret: ' . $appSecret,
    'Content-Type: application/json',
    'Content-Length: ' . strlen($json))                                                                       
);
$result = curl_exec($ch);

echo($result);

// { tokenId: 'XXXX-XXXXXX-XXXXXX-XXXX' }

?>