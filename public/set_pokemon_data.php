<?php

include_once "Database.php";

$db = new Database();

$json = json_decode(file_get_contents("php://input"));

$key = $json->key;
$data = $json->data;

if (!$key || !$data) {
    die("need key and data");
}

$db->setData($key, json_encode($data));
exit();
