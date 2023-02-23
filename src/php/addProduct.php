<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include './server.php';
$postData = json_decode(file_get_contents("php://input"), true);
try {
    $sql = "SELECT COUNT(*) FROM products WHERE SKU = :sku";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':sku', $postData['sku']);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    if ($count > 0)
        throw new PDOException(' - SKU doubling!');
    $fields = implode(', ', array_keys($postData));
    $values = ':' . implode(', :', array_keys($postData));
    $sql = "INSERT INTO products ($fields) VALUES ($values)";
    $stmt = $conn->prepare($sql);
    foreach ($postData as $key => $value)
        $stmt->bindValue(":$key", $value);
    $stmt->execute();
    echo json_encode($postData);
} catch (\PDOException $e) {
    $errorMessage = $e->getMessage();
    $response = array('error' => 'Add product failed' . $errorMessage);
    echo json_encode($response);
}
