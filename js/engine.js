(() => {
    "use strict";
    $(() => {
        initVerbs();

        $('#new_verb').on('click', function () {
            $('#answers')[0].reset();
            return getNewVerb();
        });

        $('#hard_reset').on('click', function () {
            $('#answers')[0].reset();
            return hardReset();
        });

        $('#clue').on('click', function () {
            createAlert('info', 'Not available, coming soon !');
            $('#answers')[0].reset();
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