<?php

require '../../app/common.php';


// 1. Go to the database and get all work associated with the $taskId
$tubrineArr = Turbine::getAllTurbines();

// 2. Convert to JSON
$json = json_encode($turbineArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
