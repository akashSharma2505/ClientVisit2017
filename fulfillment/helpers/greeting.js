var builder = require("botbuilder");

module.exports = [
    (session, args, next) => {
        if (session.userData.first_name) {

            session.endDialog(`Hello ${session.userData.first_name}. :)`);
            var msg = new builder.Message()
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .address(address)
            .attachments(create_cards(body, session));
        session.endDialog(msg);
        } else {
            console.log(session.message.address);
            session.endDialog(`Hello there . :)`);
        }
    }
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
