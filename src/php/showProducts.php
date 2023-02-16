<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
include './server.php';
$sql = "SELECT * FROM products";
$result = $conn->prepare($sql);
$result->execute();
$rows = array();
while ($row = $result->fetch(\PDO::FETCH_ASSOC)) {
    $rows[] = $row;
}
echo json_encode($rows);
