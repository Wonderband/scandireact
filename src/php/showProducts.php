<?php
// header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
include './server.php';
try {
    $sql = "SELECT * FROM products";
    $result = $conn->prepare($sql);
    $result->execute();
    $rows = array();
    while ($row = $result->fetch(\PDO::FETCH_ASSOC)) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} catch (\PDOException $e) {
    $errorMessage = $e->getMessage();
    $response = array('error' => 'Cannot display cards:' . $errorMessage);
    echo json_encode($response);
}
