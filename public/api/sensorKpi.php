<?php


require '../../app/common.php';

$sensorId = intval($_GET['sensorId'] ?? 0);

// 1. Go to the database and get all work associated with the $turbineId
$sensorKPIArr = SensorKpi::getSensorKpiBySensorId($sensorId);

// 2. Convert to JSON
$json = json_encode($sensorKPIArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
