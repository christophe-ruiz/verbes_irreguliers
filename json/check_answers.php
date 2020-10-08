<?php

require_once '../php/verbs.php';
session_start();

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json; charset=utf-8');

$real_verb = unserialize($_SESSION['verb']);

$answer_infinitive = trim(strtolower($_POST['infinitive']));
$answer_simplePast = trim(strtolower($_POST['simple_past']));
$answer_pastParticiple = trim(strtolower($_POST['past_participle']));

if (isset($_POST['simple_past_other']))
    $answer_simplePast_other = trim(strtolower($_POST['simple_past_other']));
if (isset($_POST['past_participle_other']))
    $answer_pastParticiple_other = trim(strtolower($_POST['past_participle_other']));

$otherSpNotSetNotNormal = (!isset($answer_simplePast_other) && strpos($real_verb['Simple Past'], "/"));
$otherPpNotSetNotNormal = (!isset($answer_pastParticiple_other) && strpos($real_verb['Past Participle'], "/"));

$obj = new stdClass();
$obj->success = false;

$pastParticipleAreOk = false;
$simplePastAreOk = false;

if (!empty($answer_infinitive) &&
    !empty($answer_simplePast) &&
    !empty($answer_pastParticiple))
{
    if ($otherPpNotSetNotNormal || $otherPpNotSetNotNormal) {
        echo json_encode($obj);
        return;
    }

    $real_verb_infinitive = strtolower($real_verb['Infinitive']);
    $real_verb_simplePast = strtolower($real_verb['Simple Past']);
    $real_verb_pastParticiple = strtolower($real_verb['Past Participle']);

    if (!isset($answer_simplePast_other)) {
        $simplePastAreOk = ($real_verb_simplePast == $answer_simplePast);
    } else {
        $simplePasts = explode('/', $real_verb_simplePast, 2);
        $simplePastAreOk = (
            trim($simplePasts[0]) == $answer_simplePast &&
            trim($simplePasts[1]) == $answer_simplePast_other
        );
    }

    if (!isset($answer_pastParticiple_other)) {
        $pastParticipleAreOk = ($real_verb_pastParticiple == $answer_pastParticiple);
    } else {
        $pastParticiples = explode('/', $real_verb_pastParticiple, 2);
        $pastParticipleAreOk = (
            trim($pastParticiples[0]) == $answer_pastParticiple &&
            trim($pastParticiples[1]) == $answer_pastParticiple_other
        );
    }

    if ($answer_infinitive == $real_verb_infinitive &&
        $simplePastAreOk &&
        $pastParticipleAreOk)
    {
        $obj->success = true;
    }
}

echo json_encode($obj);