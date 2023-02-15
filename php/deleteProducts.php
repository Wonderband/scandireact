<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include './server.php';
$postData = json_decode(file_get_contents("php://input"), true);
$skuArray = $postData['selected'] ?? [];
foreach ($skuArray as $sku) {
    $sql = "DELETE FROM products WHERE sku = '$sku'";
    $result = $conn->prepare($sql);
    $result->execute();
}
