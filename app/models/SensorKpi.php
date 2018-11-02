<?php

class SensorKpi{

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

  public static function getSensorKpiBySensorId($sensorId) {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM sensorTimeSeries as st, sensorDeployed as sd where sd.sensorDeployedId = st.sensorDeployedId and st.sensorDeployedId=?;';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
      [$sensorId]
    );

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $sensorKpiItem =  new SensorKpi($row);

      array_push($arr, $sensorKpiItem);
    }

    return $arr;
  }


}
