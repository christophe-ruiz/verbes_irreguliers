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
        console.log(data);
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
        initVerbs();
        createAlert('info', "Reset successful !");
    }).fail(() => {
        createAlert('fail', "Couldn't hard reset.");
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