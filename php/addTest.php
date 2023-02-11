<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$servername = 'localhost';
$username = 'id19542860_root';
$password = "X_Jr]@gBZxN74iA{";
$dbname = "id19542860_testdb";
$postData = json_decode(file_get_contents("php://input"), true);
try {
    $conn = new \PDO("mysql:host=$servername; dbname=$dbname", $username, $password);
    $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT COUNT(*) FROM products WHERE SKU = :sku";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':sku', $postData['sku']);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        echo '<div>SKU already exists!</div>';
    } else {
        $fields = implode(', ', array_keys($postData));
        $values = ':' . implode(', :', array_keys($postData));
        $sql = "INSERT INTO products ($fields) VALUES ($values)";
        $stmt = $conn->prepare($sql);
        foreach ($postData as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        $stmt->execute();
        echo json_encode($postData);
    }
} catch (\PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
