<?php

include_once "DatabaseCreds.php";

class Database {

    private $conn;

    public function __construct()
    {
        $creds = new DatabaseCreds();
        $this->conn = mysqli_connect(
            $creds->db_host,
            $creds->db_user,
            $creds->db_pass,
            $creds->db_name
        );
        if ($this->conn->connect_error) {
          die($this->conn->connect_error);
        }
    }

    public static function generateRandomString($length = 16) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function dataKeyExists($key) {
        $q = $this->conn->query("SELECT * FROM tracker_data WHERE `key`='$key'");
        return $q->num_rows != 0;
    }

    public function getDataKey() {
        $key = self::generateRandomString();
        while ($this->dataKeyExists($key)) {
            $key = self::generateRandomString();
        }
        $this->createDataRow($key);
        return $key;
    }

    private function createDataRow($key) {
        $this->conn->query("INSERT INTO tracker_data(`key`) VALUE ('$key')");
    }

    public function getData($key) {
        $q = $this->conn->query("SELECT `data` from tracker_data where `key`='$key'");
        if ($q->num_rows != 1) {
            return null;
        }
        return $q->fetch_assoc()["data"];
    }

    public function setData($key, $data) {
        if (!$this->dataKeyExists($key)) {
            return null;
        }
        $this->conn->query("UPDATE tracker_data SET `data`='$data' WHERE `key`='$key'");
    }
}
