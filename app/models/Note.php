<?php

class Note{

  public $noteId;
  public $clientId;
  public $noteDescription;

  public function __construct($row) {
    $this->noteId = intval($row['noteId']);
    $this->clientId = intval($row['clientId']);

    $this->clientDescription = $row['clientDescription'];
  }

  //TODO add create method for POST

  public static function getAllNotes() {
    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM notes';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      // 4.a. For each row, make a new work object
      $noteItem =  new Note($row);

      array_push($arr, $noteItem);
    }

    return $arr;
  }


}
