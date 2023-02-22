<?php
// header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
include './server.php';
$postData = json_decode(file_get_contents("php://input"), true);
$skuArray = $postData['selected'] ?? [];
try {
    foreach ($skuArray as $sku) {
        $sql = "DELETE FROM products WHERE sku = '$sku'";
        $result = $conn->prepare($sql);
        $result->execute();
    }
} catch (\PDOException $e) {
    $errorMessage = $e->getMessage();
    $response = array('error' => 'Delete product failed' . $errorMessage);
    echo json_encode($response);
}
