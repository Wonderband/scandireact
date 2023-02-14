<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
// namespace Database;

// require("./src/Products/DVD.php");
// require("./src/Products/Furniture.php");
// require("./src/Products/Book.php");

// class ProductsDatabase
// {


function displayAllProducts($server = 'localhost', $user = 'id19542860_root')
{
    $servername = $server;
    $username = $user;
    $password = "X_Jr]@gBZxN74iA{";

    try {
        $conn = new \PDO("mysql:host=$servername;dbname=id19542860_testdb", $username, $password);
        $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $sql = "SELECT * FROM products";
        $result = $conn->prepare($sql);
        $result->execute();
        $rows = array();
        while ($row = $result->fetch(\PDO::FETCH_ASSOC)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        //     $classname = 'Products\\' . $row["type"];
        //     $product = new $classname($row);
        //     //$product = new $row["type"] ($row);                 
        //     $product->SetAttributes($row);
        //     $product->outputMainInfo();
        //     $product->outputAttributes();
        // }
    } catch (\PDOException $e) {
        $errorMessage = $e->getMessage();
        $response = array('error' => "Connection failed: " . $errorMessage);
        echo json_encode($response);
    }
};

// public function massDelete($server, $user, $postArray)
// {
//     $servername = $server;
//     $username = $user;
//     $password = "X_Jr]@gBZxN74iA{";
//     $skuArray = array();

//     foreach ($postArray as $key => $value)
//         array_push($skuArray, $key);
//     try {
//         $conn = new \PDO("mysql:host=$servername;dbname=id19542860_testdb", $username, $password);
//         $conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
//         foreach ($skuArray as $sku) {
//             $sql = "DELETE FROM products WHERE sku = '$sku'";
//             $result = $conn->prepare($sql);
//             $result->execute();
//             // echo "Success!";
//         }
//         // echo "Success!";
//     } catch (\PDOException $e) {
//         echo "Connection failed: " . $e->getMessage();
//     }
//     header("Location: /");
// }
// }

displayAllProducts();
