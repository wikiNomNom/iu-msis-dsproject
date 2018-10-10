<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'notePost.php';
  exit;
}

$noteArr = Note::getAllNotes();

// 2. Convert to JSON
$json = json_encode($noteArr, JSON_PRETTY_PRINT);

// 3. Print
header('Content-Type: application/json');
echo $json;
