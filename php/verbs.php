<?php

class Verbs {
    private $verbs_list = array();
    private $already_seen_verbs = array();

    public function __construct() {
        $this->verbs_list = json_decode(file_get_contents('../data/data.json'), true);
        shuffle($this->verbs_list);
    }

    /**
     * Returns le list of possible verbs
     * @return array|mixed
     */
    public function getVerbsList() {
        return $this->verbs_list;
    }

    /**
     * @return array
     */
    public function getAlreadySeenVerbs()
    {
        return $this->already_seen_verbs;
    }

    public function getNewVerb() {
        if (!count($this->verbs_list))
            return array("Infinitive" => "We've run out of words, please click the reset button 😊");
        $this->already_seen_verbs[] = array_pop($this->verbs_list);
        return $this->already_seen_verbs[array_key_last($this->already_seen_verbs)];
    }
}

