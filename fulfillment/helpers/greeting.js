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
        var userdetails = {
            "Get Flight details": {
                value: "show me my flight details",

            },
            "Get Hotel details": {
                value: "show me my hotel details",
            }
        };

        if (session.userData.first_name) {
            builder.Prompts.text(session, `Hello ${session.userData.first_name}. :)`);
        } else {
            console.log(session.message.address);
            builder.Prompts.text(session, `Hello there . :)`);
        }

        session.beginDialog(session, '*:/userdetail');



    }

];


