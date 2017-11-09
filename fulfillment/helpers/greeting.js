var builder = require("botbuilder");

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

            builder.Prompts.text(session,`Hello ${session.userData.first_name}. :)`);
        } else {
            console.log(session.message.address);
            builder.Prompts.text(session,`Hello there . :)`);
        }
        bot.dialog('userdetail', [
            function (session) {
                builder.Prompts.choice(session, "Please choose 1 of the given options",userdetails );
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
       
        
    }
];