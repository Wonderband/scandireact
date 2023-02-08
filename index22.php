<?php

namespace Database; ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title> Scandiweb Test assignment</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="styles.css" rel="stylesheet">
</head>

<body>
    <div class="header">
        <h1>Product List</h1>
        <div class="buttons">
            <button type="button" id="add-product">ADD</button>
            <button type="submit" form="product-form" id="delete-product-bin">MASS DELETE</button>
        </div>
        <hr>
    </div>

    <div class="container">
        <form method="POST" id="product-form" action="mass-delete.php" ;>
            <?php
            require("./src/Database/ProductsDatabase.php");
            $obj = new ProductsDatabase();
            $obj->displayAllProducts('localhost', 'id19542860_root');
            ?>
        </form>
    </div>

    <div class="footer">
        <hr>
        <p> Scandiweb Test assignment</p>
    </div>

    <script type="text/javascript">
        document.getElementById("add-product").onclick = function() {
            location.href = "add-product";
        };
    </script>
</body>

</html>