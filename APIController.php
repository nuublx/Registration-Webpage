<?php
require 'API_Ops.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $month = $_GET['month'];
    $day = $_GET['day'];
    $my_api = new API_Handler($month, $day);
    $my_api->getActorsData();
}

?>