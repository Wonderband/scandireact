<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
$servername = 'localhost';
$dbname = 'id19542860_testdb';
$username = 'id19542860_root';
$password = "X_Jr]@gBZxN74iA{";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    $response = array('error' => "Connection failed: " . $errorMessage);
    echo json_encode($response);
}
