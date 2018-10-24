<?php

require '../../app/common.php';

$siteId = intval($_GET['siteId'] ?? 0);

echo $siteId;

// 1. Go to the database and get all work associated with the $taskId
$turbineDisplayArr = TurbineDisplay::getTurbineBySiteId($siteId);

// 2. Convert to JSON
$json = json_encode($turbineDisplayArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
