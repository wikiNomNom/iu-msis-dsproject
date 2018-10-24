<?php

class Site{

  public $siteId;
  public $clientId;
  public $siteName;
  public $siteDescription;
  public $primaryContact;
  public $capacity;
  public $commercialDate;
  public $addrLine1;
  public $addrLine2;
  public $addrCity;
  public $addrState;
  public $addrZip;
  public $addrCountry;

  public function __construct($row) {
    $this->siteId = intval($row['siteId']);
    $this->clientId = intval($row['clientId']);

    $this->siteName = $row['siteName'];
    $this->siteDescription = $row['siteDescription'];
    $this->primaryContact = $row['primaryContact'];

    $this->capacity = intval($row['capacity']);

    $this->commercialDate = $row['commercialDate'];
    $this->addrLine1 = $row['addrLine1'];
    $this->addrLine2 = $row['addrLine2'];
    $this->addrCity = $row['addrCity'];
    $this->addrState = $row['addrState'];
    $this->addrZip = $row['addrZip'];
    $this->addrCountry = $row['addrCountry'];
  }

  public static function getAllSites() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM site';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $siteItem =  new Site($row);

      array_push($arr, $siteItem);
    }

    return $arr;
  }//getAllSites

  public static function getSiteByClientId($clientId){

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM site WHERE clientId = ?';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(
      [$clientId]
    );

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $siteItem =  new Site($row);

      array_push($arr, $siteItem);
    }

    return $arr;
  }//getSiteByClientId

}
