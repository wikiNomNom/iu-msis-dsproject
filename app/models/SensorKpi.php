<?php
 
class SensorKPI{

  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;

  public function __construct($row) {
    $this->sensorDeployedId = intval($row['sensorDeployedId']);

    $this->dataCollectedDate = $row['dataCollectedDate'];

    $this->output = doubleval($row['output']);
    $this->heatRate = doubleval($row['heatRate']);
    $this->compressorEfficiency = doubleval($row['compressorEfficiency']);
    $this->availability = doubleval($row['availability']);
    $this->reliability = doubleval($row['reliability']);
    $this->firedHours = doubleval($row['firedHours']);

    $this->trips = intval($row['trips']);
    $this->starts = intval($row['starts']);
  }

  public static function getSensorKpiByTurbineId($turbineId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM sensorTimeSeries as st, sensorDeployed as sd, turbineDeployed as td WHERE st.sensorDeployedId = sd.sensorDeployedId AND sd.turbineDeployedId = td.turbineDeployedId AND sd.turbineDeployedId = 1;';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
      [$turbineId]
    );

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorKpiItem =  new SensorKPI($row);

      array_push($arr, $sensorKpiItem);
    }

    return $arr;
  }


}
