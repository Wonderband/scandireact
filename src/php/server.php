<?php
// header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
$servername = 'localhost';
$dbname = 'id20351802_newdb';
$username = 'id20351802_user';
$password = "X_Jr]@gBZxN74iA{";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $errorMessage = $e->getMessage();
    $response = array('error' => "Connection failed: " . $errorMessage);
    echo json_encode($response);
    exit();
}
