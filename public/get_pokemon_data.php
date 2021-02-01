<?php

include_once "Database.php";
include_once "utils.php";

$key = $_GET["key"];

if (!$key) {
    die("No key supplied");
}

$db = new Database();

$data = $db->getData($key);

echo_json([
    "success" => true,
    "data" => json_decode($data),
]);
exit();
