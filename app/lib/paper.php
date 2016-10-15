<?php

$username = "403850398";

$curl 		= curl_init();
$url		= "http://163.13.21.18:9191/rpc/api/web/user/" . $username ."/details.json";
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($curl, CURLOPT_COOKIEFILE, 1);
curl_setopt($curl, CURLOPT_COOKIEJAR, 1);


$curlResult = curl_exec($curl);
curl_close($curl);

echo $curlResult;


//http://163.13.21.18:9191/rpc/api/web/print-stats.json
?>