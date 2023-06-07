<?php
$localhost = "localhost";
$db="shopping_cart";
$user="root";
$pwd="";

$conn = new mysqli($localhost, $user, $pwd, $db);
if($conn->connect_errno){
    echo "something wenr wrong" . $conn->connect_error;
    exit();
}

