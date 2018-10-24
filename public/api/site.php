<?php

require '../../app/common.php';

$clientId = intval($_GET['clientId'] ?? 0);

// 1. Go to the database and get all work associated with the $taskId
$siteArr = Site::getSiteByClientId($clientId);

// 2. Convert to JSON
$json = json_encode($siteArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
