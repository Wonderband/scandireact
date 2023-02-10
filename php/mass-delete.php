<?php

namespace Database;

require('./src/Database/ProductsDatabase.php');
$obj = new ProductsDatabase();
$obj->massDelete('localhost', 'id19542860_root', $_POST);



?>

<script type="text/javascript">
    history.go(-1);
</script>