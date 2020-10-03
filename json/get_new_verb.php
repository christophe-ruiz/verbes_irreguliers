<?php

require_once '../php/verbs.php';
session_start();

$obj = new stdClass();

$verbs = unserialize($_SESSION['verbs']);
$verb = $verbs->getNewVerb();
$_SESSION['verb'] = serialize($verb);
$_SESSION['verbs'] = serialize($verbs);
$obj->verb = $verb;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');
echo json_encode($obj);
