<?php

require '../../app/common.php';

$turbineId = intval($_GET['turbineId'] ?? 0);

// 1. Go to the database and get all work associated with the $taskId
$sensorDisplayArr = SensorDisplay::getSensorByTurbineId($turbineId);

// 2. Convert to JSON
$json = json_encode($sensorDisplayArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
