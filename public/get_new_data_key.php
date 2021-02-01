<?php

include_once "Database.php";
include_once "utils.php";

$db = new Database();

$key = $db->getDataKey();

echo_json([
    "success" => true,
    "key" => $key,
]);
exit();
