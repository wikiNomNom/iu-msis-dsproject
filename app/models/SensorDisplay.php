<?php

class SensorDisplay{

  public $sensorId;
  public $sensorName;
  public $sensorDescription;
  public $serialNumber;
  public $deployedDate;
  // public $totalFiredHours;
  // public $totalStarts;
  // public $lastPlannedOutageDate;
  // public $lastUnplannedOutageDate;

  public function __construct($row) {
    $this->sensorId = intval($row['sensorId']);
    $this->sensorName = $row['sensorName'];
    $this->sensorDescription = $row['sensorDescription'];

    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
    //
    // $this->totalFiredHours = floatval($row['totalFiredHours']);
    // $this->totalStarts = floatval($row['totalStarts']);
    //
    // $this->lastPlannedOutageDate = $row['lastPlannedOutageDate'];
    // $this->lastUnplannedOutageDate = $row['lastUnplannedOutageDate'];
  }

  public static function getSensorByTurbineId($turbineId){

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT sd.sensorDeployedId as sensorId, s.sensorName, s.sensorDescription, sd.serialNumber, sd.deployedDate from sensor as s, sensorDeployed as sd where (s.sensorId = sd.sensorId) AND (sd.turbineDeployedId = ?);';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
      [$turbineId]
    );


    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      #echo "making row";
      $sensorDisplayItem =  new SensorDisplay($row);

      array_push($arr, $sensorDisplayItem);
    }

    return $arr;
  }//getSensorByTurbineId


}
