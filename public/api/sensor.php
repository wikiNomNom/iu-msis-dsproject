<?php

require '../../app/common.php';


// 1. Go to the database and get all work associated with the $taskId
$sensorArr = Sensor::getAllSensors();

// 2. Convert to JSON
$json = json_encode($sensorArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
