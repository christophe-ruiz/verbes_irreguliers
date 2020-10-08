(() => {
    "use strict";
    $(() => {
        initVerbs();
        createAlert('info', 'Clues are now available !');

        $('#new_verb').on('click', function () {
            $('#answers')[0].reset();
            return getNewVerb();
        });

        $('#hard_reset').on('click', function () {
            $('#answers')[0].reset();
            return hardReset();
        });

        $('#clue').on('click', function () {
            $('#answers')[0].reset();
            return getClue();
        });

        $('#answers').on('submit', function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            }).done((data) => {
                console.log(data);
                if (data.success) {
                    $('#answers')[0].reset();
                    new ReactionMessage("success");
                    getNewVerb();
                } else {
                    new ReactionMessage("fail");
                }
            }).fail(() => {
                createAlert('fail', "Couldn't check answers.");
            });
            return false;
        });

    });
})();