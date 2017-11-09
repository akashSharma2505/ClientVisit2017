var builder = require("botbuilder");

module.exports = [
    (session, args, next) => {
        if (session.userData.first_name) {

            // session.endDialog(`Hello ${session.userData.first_name}. :)`);


            builder.Prompts.choice(session, "Which color?", "red|green|blue");
        } else {
            console.log(session.message.address);
            session.endDialog(`Hello there . :)`);
        }
    }
];