var builder = require("botbuilder");
const MICROSOFT_APP_ID = process.env.MICROSOFT_APP_ID || 'e4dcbef8-3545-4e8f-b4c8-aa2011cb671a';
const API_AI_TOKEN = process.env.API_AI_TOKEN || 'api_ai';
const MICROSOFT_APP_PASSWORD = process.env.MICROSOFT_APP_PASSWORD || 'avBBCTHdoztAxVU1Q7nojrS';
var connector = new builder.ChatConnector({
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);


bot.dialog('/userdetail', [
    function (session) {

        var userdetails = {
            "Get Flight details": {
                value: "show me my flight details",

            },
            "Get Hotel details": {
                value: "show me my hotel details",
            }
        };
        builder.Prompts.choice(session, "Please choose 1 of the given options", userdetails);
    },
    function (session, results) {
        if (results.response) {
            var data = userdetails[results.response.entity];
            session.endDialogWithResult(`${data.value}.`);
        } else {
            session.endDialogWithResult("OK");
        }
    }
]);


module.exports = [
    (session, args, next) => {

<<<<<<< HEAD
            session.endDialog(`Hello ${session.userData.first_name}. :)`);
            var msg = new builder.Message()
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .address(address)
            .attachments(create_cards(body, session));
        session.endDialog(msg);
=======

        if (session.userData.first_name) {
            builder.Prompts.text(session, `Hello ${session.userData.first_name}. :)`);
>>>>>>> 6c781f366d523fcf990cc8dd1d80749de7bda1f3
        } else {
            console.log(session.message.address);
            builder.Prompts.text(session, `Hello there . :)`);
        }

        session.beginDialog(session, '/userdetail');



    }
<<<<<<< HEAD
];

function create_cards(body, session_to_use) {
    console.log(JSON.stringify(body));
    var crew = body;
    var cards = [];
    for (i = 0; i < crew.length; i++) {

        var item = crew[i];
        var option = item.EmpId;
        var card = new builder.HeroCard(session_to_use)
            .title("Please choose one option from the given choice")
            .buttons([builder.CardAction.imBack(session_to_use, 'Give me my flight details', 'Flight details'),
            builder.CardAction.imBack(session_to_use, 'Give me my hotel details', 'Hotel details')])
        cards.push(card);
    }
    console.log(JSON.stringify(cards));
    return cards;
}
=======

];


>>>>>>> 6c781f366d523fcf990cc8dd1d80749de7bda1f3
