var builder = require("botbuilder");
var request = require("request");

module.exports = [
    (session, args, next) => {
        var entities = args.entities;
        var option_num = 0;
        var useridlocal;

        console.log("My Session: " + session.address);

        var offer_option = {
            url: ' http://ghbotapi.azurewebsites.net/sasusers/',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            json: true
        };
        request(offer_option, function (error, response, body) {
            if (error) {
                console.log('Unable to get data ');
                session.send(`We will get back to you with ancillary offers...`);
                throw new Error(error);

            } else {

                for (var i = 0, len = body.length; i < len; i++) {
                    if (body[i].FirstName + body[i].LastName === session.userData.first_name + session.message.address.user) {
                        useridlocal = body[i].UserID;
                    }
                }

                var offer_option = {
                    method: 'GET',
                    url: 'http://ghbotapi.azurewebsites.net/sasusers/' + useridlocal + '/flight',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: anc_body,
                    json: true
                };
                request(offer_option, function (error, response, body) {
                    if (error) {
                        console.log('Offeres are not saved....');
                    } else {

                        create_cards(body, session);
                    }
                });
            }
        });
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
            .title(body.Origin + " To " + body.Destination)
            .subtitle("Flight: " + body.FlightNo + "Departing at : " + body.DepartureDate)
            .images([
                builder.CardImage.create(session_to_use, get_image_url("MEL"))
            ])
            .buttons([builder.CardAction.postBack(session_to_use, 'Select Crew Member ' + option, 'Select Crew Member')]);
        cards.push(card);
    }
    console.log(cards);
    return cards;
}

function get_image_url(code) {
    if (code === 'MEL') {

        return 'http://www.cardatabase.net/modifiedairlinerphotos/photos/big/00014380.jpg';
    }
    if (code === 'CON') {

        return 'http://www.informationsecuritybuzz.com/wp-content/uploads/wifi-1.jpg';
    }
    if (code === 'BAG') {

        return 'https://dishccvmy41gl.cloudfront.net/spree/products/173/product_retina/Away_Large_Navy.jpg?1493120102https://s3-us-west-2.amazonaws.com/beachbody-blog/uploads/2016/05/mexican-meal-prep.jpg'
    }
    if (code === 'SET') {

        return 'https://i.pinimg.com/originals/c0/a6/09/c0a609801d296f340a04f0014bfc67fc.jpg';
    }
}

function get_txt(code) {
    if (code === 'MEL') {

        return 'Amazing meals';
    }
    if (code === 'CON') {

        return 'Fast connection anywhere';
    }
    if (code === 'BAG') {

        return 'Extra luggage allowance';
    }
    if (code === 'SET') {

        return 'Extra comfort';
    }
}

function get_titles(code) {
    if (code === 'MEL') {

        return 'Meals';
    }
    if (code === 'CON') {

        return 'Wifi';
    }
    if (code === 'BAG') {

        return 'Luggage';
    }
    if (code === 'SET') {

        return 'Seat';
    }
}



function get_txt(code) {
    if (code === 'MEL') {

        return 'Amazing meals';
    }
    if (code === 'CON') {

        return 'Fast connection anywhere';
    }
    if (code === 'BAG') {

        return 'Extra luggage allowance';
    }
    if (code === 'SET') {

        return 'Extra comfort';
    }
}