var builder = require("botbuilder");
var request = require("request");

module.exports = [
    (session, args, next) => {
        var entities = args.entities;
        var option_num = 0;
        var useridlocal;
        var empid = "null";
        var object = "null";
        var flighturl;
        for (var i = 0, len = entities.length; i < len; i++) {
            if (entities[i].type === 'builtin.number') {
                empid = entities[i].entity;
            }
            else if (entities[i].type === 'Object') {
                object = entities[i].entity;
            }
        }

       


console.log("End point URL is ");
        console.log('http://ghbotapi.azurewebsites.net/sasusers/' + empid + '/' +object+'/null/null/');

        var offer_option = {
            method: 'GET',
            url: 'http://ghbotapi.azurewebsites.net/sasusers/' + empid + '/' +object+'/null/null/',
            headers: {
                'content-type': 'application/json'
            },
            json: true
        };
        request(offer_option, function (error, response, body) {
            if (error) {
                console.log('Offeres are not saved....');
            } else {
                
                var address = session.message.address;
                var msg = new builder.Message()
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .address(address)
                    .attachments(create_cards(body, session,object));
                session.endDialog(msg);

            }
        });
    }

];

function create_cards(body, session_to_use,object) {
    console.log(JSON.stringify(body));
    var crew = body;
    var cards = [];
    for (i = 0; i < crew.length; i++) {

        var item = crew[i];
        var option = item.EmpId;
        if(object=="flight")
        {
        var card = new builder.HeroCard(session_to_use)
            .title(body[i].Origin + " To " + body[i].Destination)
            .subtitle("Flight: " + body[i].FlightNo + "Departing at : " + body[i].DepartureDate)
            .images([
                builder.CardImage.create(session_to_use, body[i].flightpic)
            ])
            .buttons([builder.CardAction.imBack(session_to_use, 'Flight Details for ' + body[i].FlightNo)]);
            cards.push(card);
            
        }
        else 
        {
            var card = new builder.HeroCard(session_to_use)
            .title( body[i].HotelName)
            .subtitle("Hotel Address : " + body[i].HotelAddress)
            .images([
                builder.CardImage.create(session_to_use, body[i].hotepic)
            ])
            .buttons([builder.CardAction.postBack(session_to_use, 'Hotel details for ' + body[i].HotelName, 'Click to find more')]);
            cards.push(card);
            
        }
       
    }
    console.log(JSON.stringify(cards));

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