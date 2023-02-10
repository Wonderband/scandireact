<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

function massDelete($server = 'localhost', $user = 'id19542860_root', $postArray)
{
    $servername = $server;
    $username = $user;
    $password = "X_Jr]@gBZxN74iA{";
    // echo $servername;
    // echo $postArray;
    $postData = json_decode(file_get_contents("php://input"), true);
    $skuArray = $postData['selected'] ?? [];
    // if (!empty($selected)) {
    //     print_r($selected);
    // } else {
    //     echo "No data received in the POST request.";
    // }


    // $postData = $_POST['selected'];
    // print_r($postData);
    try {
        $conn = new \PDO("mysql:host=$servername;dbname=id19542860_testdb", $username, $password);
        $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        foreach ($skuArray as $sku) {
            $sql = "DELETE FROM products WHERE sku = '$sku'";
            $result = $conn->prepare($sql);
            $result->execute();
            // echo "Success!";
        }
        echo "Success!";
    } catch (\PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    // header("Location: /");
}

massDelete('localhost', 'id19542860_root', $_POST);
