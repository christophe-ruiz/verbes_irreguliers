let hideUselessFields = function () {
    $('#past_participle_other').hide();
    $('#past_participle_other_lbl').hide();

    $('#simple_past_other').hide();
    $('#simple_past_other_lbl').hide();
};

let initVerbs = function () {
    hideUselessFields();
    $.ajax({
        url: "json/init_verbs.php",
        method: 'get'
    }).done(function () {
        getNewVerb();
    }).fail(() => {
        createAlert('fail', "Coudn't initialize verbs.");
    });
    return false;
};

let getNewVerb = function () {
    hideUselessFields();
    $.ajax({
        url: '../json/get_new_verb.php'
    }).done((data) => {
        let verb = data.verb;
        $("#verb").text(verb["French"]);

        if (verb["Simple Past"].includes("/")) {
            $('#simple_past_other').show();
            $('#simple_past_other_lbl').show();
        }

        if (verb["Past Participle"].includes("/")) {
            $('#past_participle_other').show();
            $('#past_participle_other_lbl').show();
        }

        if ("Subtext" in verb) {
            $("#subtext").text(verb["Subtext"]);
        } else {
            $("#subtext").empty();
        }
    }).fail(() => {
        createAlert('fail', "Coudn't get new verb.");
    });
    return false;
};

let hardReset = function () {
    $.ajax({
        url: '../json/hard_reset.php'
    }).done(() => {
        $('#infinitive').attr('placeholder', "");
        $('#simple_past').attr('placeholder', "");
        $('#past_participle').attr('placeholder', "");
        $('#simple_past_other').attr('placeholder', "");
        $('#past_participle_other').attr('placeholder', "");
        initVerbs();
        createAlert('info', "Reset successful !");
    }).fail(() => {
        createAlert('fail', "Couldn't hard reset.");
    });
    return false;
};

let getClue = function () {
    $.ajax({
        url: '../json/get_clue.php',
    }).done((data) => {
        let infinitive = $('#infinitive');
        infinitive.attr(
            'placeholder',
            infinitive.attr('placeholder') +(data.clue['Infinitive'] ? data.clue['Infinitive'] : "")
        );

        let simple_past = $('#simple_past');
        simple_past.attr(
            'placeholder',
            simple_past.attr('placeholder') + (data.clue['Simple Past'] ? data.clue['Simple Past'] : "")
        );
        let simple_past_other = $('#simple_past_other');
        simple_past_other.attr(
            'placeholder',
            simple_past_other.attr('placeholder') + (data.clue['Simple Past Other'] ? data.clue['Simple Past Other'] : "")
        );

        let past_participle = $('#past_participle');
        past_participle.attr(
            'placeholder',
            past_participle.attr('placeholder') + (data.clue['Past Participle'] ? data.clue['Past Participle'] : "")
        );
        let past_participle_other = $('#past_participle_other');
        past_participle_other.attr(
            'placeholder',
            past_participle_other.attr('placeholder') + (data.clue['Past Participle Other'] ? data.clue['Past Participle Other'] : "")
        );
    }).fail(() => {
        new ReactionMessage('fail', "Couldn't get a clue.");
    });
    return false;
};

/**
 * From https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
 * @param min the minimum possible value
 * @param max the maximum possible value
 * @returns {number}
 */
let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};