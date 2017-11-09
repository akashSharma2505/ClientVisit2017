var builder = require("botbuilder");

module.exports = [
    (session, args, next) => {
        // session.endDialog(`Hello ${session.userData.first_name}. :)`);
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


        //builder.Prompts.choice(session, "Please choose 1 of the given options", userdetails);
        session.endDialog(builder.Prompts.choice(session, "Please choose 1 of the given options", userdetails));
    }
];