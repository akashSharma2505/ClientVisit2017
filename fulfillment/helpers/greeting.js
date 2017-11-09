var builder = require("botbuilder");

module.exports = [
    (session, args, next) => {
        if (session.userData.first_name) {

            builder.Prompts.text(session,`Hello ${session.userData.first_name}. :)`);
        } else {
            console.log(session.message.address);
            builder.Prompts.text(session,`Hello there . :)`);
        }
        builder.Prompts.choice(session, "Please choose 1 of the given options", "My flight details|My hotel details");
        
    }
];