<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$servername = 'localhost';
$username = 'id19542860_root';
$password = "X_Jr]@gBZxN74iA{";
$dbname = "id19542860_testdb";

$postData = json_decode(file_get_contents("php://input"), true);
// $skuArray = $postData['selected'] ?? [];
try {
    $conn = new \PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
    $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    $sql = "SELECT COUNT(*) FROM products WHERE SKU ='$postData[sku]'";
    $result = $conn->query($sql);
    $count = $result->fetchColumn();
    if ($count > 0) {
        // echo file_get_contents('./templates/alert.html');
        echo '<div>DOUBLE SKU!!!</div>';
    } else {
        // if (!$this->size) $this->size = 0;
        // if (!$this->height) $this->height = 0;
        // if (!$this->width) $this->width = 0;
        // if (!$this->length) $this->length = 0;
        // if (!$this->weight) $this->weight = 0;
        $columns = "";
        $values = "";
        foreach ($postData as $key => $value) {
            $columns .= "$key, ";
            $values .= "'$value', ";
        }
        $columns = rtrim($columns, ", ");
        $values = rtrim($values, ", ");

        $sql = "INSERT INTO products($columns) VALUES ($values)";
        $conn->exec($sql);
    }
    // $result = $conn->prepare($sql);
    // $result->execute();
    print_r($postData);
} catch (\PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
