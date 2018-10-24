<?php

class TurbineDeployed{

  public $turbineDeployedId;
  public $turbineId;
  public $siteId;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;

  public function __construct($row) {
    $this->turbineDeployedId = intval($row['turbineDeployedId']);
    $this->turbineId = intval($row['turbineId']);
    $this->siteId = intval($row['siteId']);

    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];

    $this->totalFiredHours = floatval($row['totalFiredHours']);
    $this->totalStarts = floatval($row['totalStarts']);

    $this->lastPlannedOutageDate = $row['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $row['lastUnplannedOutageDate'];
  }

  public static function getAllTurbineDeployed() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM turbineDeployed';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $turbineDeployedItem =  new TurbineDeployed($row);

      array_push($arr, $turbineDeployedItem);
    }

    return $arr;
  }//getAllTurbineDeployed


}
