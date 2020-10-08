<?php

require_once '../php/verbs.php';
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');

if (!isset($_SESSION['clue_index'])) {
    $_SESSION['clue_index'] = 0;
}


$verb = unserialize($_SESSION['verb']);
$obj = new stdClass();

$pastParticiples = explode('/', $verb['Past Participle'], 2);
$simplePasts = explode('/', $verb['Simple Past'], 2);

$obj -> pastParticiples = $pastParticiples;
$obj -> simplePasts = $simplePasts;
$obj -> index = $_SESSION['clue_index'];
$obj -> lenPPO = strlen(trim($verb['Past Participle Other']));
$obj -> lenSPO = strlen(trim($verb['Simple Past Other']));

if ($_SESSION['clue_index'] < strlen(trim($verb['Infinitive']))) {
    $obj -> clue ['Infinitive'] = mb_substr(trim($verb['Infinitive']), $_SESSION['clue_index'], 1, 'utf-8');
}

if ($_SESSION['clue_index'] < strlen(trim($simplePasts[0]))) {
    $obj -> clue ['Simple Past'] = mb_substr(trim($simplePasts[0]), $_SESSION['clue_index'], 1, 'utf-8');
}
if ($_SESSION['clue_index'] < strlen(trim(trim($simplePasts[1])))) {
    $obj -> clue ['Simple Past Other'] = mb_substr(trim($simplePasts[1]), $_SESSION['clue_index'], 1, 'utf-8');
}

if ($_SESSION['clue_index'] < strlen(trim($pastParticiples[0]))) {
    $obj -> clue ['Past Participle'] = mb_substr(trim($pastParticiples[0]), $_SESSION['clue_index'], 1, 'utf-8');
}
if ($_SESSION['clue_index'] < strlen(trim($pastParticiples[1]))) {
    $obj -> clue ['Past Participle Other'] = mb_substr(trim($pastParticiples[1]), $_SESSION['clue_index'], 1, 'utf-8');
}

$_SESSION['clue_index']++;
echo json_encode($obj);