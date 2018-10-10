<?php

class SensorDeployed{

  public $sensorDeployedId;
  public $sensorId;
  public $turbineDeployedId;
  public $serialNumber;
  public $deployedDate;

  public function __construct($row) {
    $this->sensorDeployedId = intval($row['sensorDeployedId']);
    $this->sensorId = intval($row['sensorId']);
    $this->turbineDeployedId = intval($row['turbineDeployedId']);

    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
  }

  public static function getAllSensorDeployed() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM sensorDeployed';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorDeployedItem =  new SensorDeployed($row);

      array_push($arr, $sensorDeployedItem);
    }

    return $arr;
  }


}
