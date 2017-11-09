var builder = require("botbuilder");

module.exports = [
    (session, args, next) => {
        if (session.userData.first_name) {

            // session.endDialog(`Hello ${session.userData.first_name}. :)`);
            var msg = new builder.Message()
                .attachments(
                new builder.CardAction.imBack(session_to_use, 'hotel for ', 'hotel for ')
                );
            session.endDialog(msg);
        } else {
            console.log(session.message.address);
            session.endDialog(`Hello there . :)`);
        }
    }
];