class ReactionMessage {
    constructor(type){
        this.fail_emojis = [
            "😔",
            "😕",
            "😟",
            "☹️",
            "👉👈"
        ];
        this.success_emojis = [
            "😁",
            "😉",
            "😇",
            "🤩",
            "😎",
            "😀"
        ];
        $.ajax({
            url: '../data/' + type + 'Messages.json',
            method: 'POST'
        }).done((data) => {
            let i = getRandomInt(0, data.length);
            let emoji = null;
            switch (type) {
                case "success" :
                    let success_emoji = getRandomInt(0, this.success_emojis.length);
                    emoji = this.success_emojis[success_emoji];
                    break;
                case "fail" :
                    let fail_emoji = getRandomInt(0, this.fail_emojis.length);
                    emoji = this.fail_emojis[fail_emoji];
                    break;
                default :
                    break;
            }
            createAlert(type, data[i] + (emoji ? " " + emoji : ""));
        })
    }
}