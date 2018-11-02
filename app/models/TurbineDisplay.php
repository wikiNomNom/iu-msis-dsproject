<?php
class TurbineDisplay{
  public $turbineId;
  public $turbineName;
  public $turbineDescription;
  public $siteId;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;
  public $serialNumber;
  public $deployedDate;
  public $totalFiredHours;
  public $totalStarts;
  public $lastPlannedOutageDate;
  public $lastUnplannedOutageDate;
  public function __construct($row) {
    $this->turbineId = intval($row['turbineId']);
    $this->turbineName = $row['turbineName'];
    $this->turbineDescription = $row['turbineDescription'];
    $this->siteId = intval($row['siteId']);
    $this->capacity = intval($row['capacity']);
    $this->rampUpTime = intval($row['rampUpTime']);
    $this->maintenanceInterval = intval($row['maintenanceInterval']);
    $this->serialNumber = $row['serialNumber'];
    $this->deployedDate = $row['deployedDate'];
    $this->totalFiredHours = floatval($row['totalFiredHours']);
    $this->totalStarts = floatval($row['totalStarts']);
    $this->lastPlannedOutageDate = $row['lastPlannedOutageDate'];
    $this->lastUnplannedOutageDate = $row['lastUnplannedOutageDate'];
  }
  public static function getTurbineBySiteId($siteId){
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    // 2. Prepare the query
    $sql = 'SELECT td.turbineDeployedId as turbineId, t.turbineName as turbineName, t.turbineDescription as turbineDescription, td.siteId as siteId, t.capacity as capacity, t.rampUpTime as rampUpTime, t.maintenanceInterval as maintenanceInterval, td.serialNumber as serialNumber, td.deployedDate as deployedDate, td.totalFiredHours as totalFiredHours, td.totalStarts as totalStarts, td.lastPlannedOutageDate as lastPlannedOutageDate, td.lastUnplannedOutageDate as lastUnplannedOutageDate from turbine as t, turbineDeployed as td where (t.turbineId = td.turbineId) AND (td.siteId = ?);';
    #echo $sql;
    $statement = $db->prepare($sql);
    // 3. Run the query
    $success = $statement->execute(
      [$siteId]
    );
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      #echo "making row";
      $turbineDisplayItem =  new TurbineDisplay($row);
      array_push($arr, $turbineDisplayItem);
    }
    return $arr;
  }//getTurbineBySiteId
}
