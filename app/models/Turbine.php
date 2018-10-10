<?php

class Turbine{

  public $turbineId;
  public $turbineName;
  public $turbineDescription;
  public $capacity;
  public $rampUpTime;
  public $maintenanceInterval;

  public function __construct($row) {
    $this->turbineId = intval($row['turbineId']);

    $this->turbineName = $row['turbineName'];
    $this->turbineDescription = $row['turbineDescription'];

    $this->capacity = intval($row['capacity']);
    $this->rampUpTime = intval($row['rampUpTime']);
    $this->maintenanceInterval = intval($row['maintenanceInterval']);
  }

  public static function getAllTurbines() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM turbine';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $turbineItem =  new Turbine($row);

      array_push($arr, $turbineItem);
    }

    return $arr;
  }


}
