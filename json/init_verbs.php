<?php

require_once '../php/verbs.php';
session_start();

$obj = new stdClass();
$obj-> verbs = new Verbs();
$obj-> verbs_list = $obj->verbs->getVerbsList();
$obj-> error = json_last_error();
$_SESSION['verbs'] = serialize($obj->verbs);

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');
echo json_encode($obj);
