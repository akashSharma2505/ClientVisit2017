const builder = require('botbuilder');
const express = require('express');
const calling = require('botbuilder-calling');
const apiairecognizer = require('api-ai-recognizer');
const server = express();
var request = require("request");

const {
    RetrieveUserProfile
} = require('botbuilder-facebookextension');

server.use(express.static('public'));
server.set('port', (process.env.PORT || process.env.port || 3245));
server.listen(server.get('port'), () => {
    console.log('%s listening to %s', server.name, server.get('port'));
});

const CALLBACK_URL = process.env.CALLBACK_URL || 'https://luisbotsas.azurewebsites.net/api/calls';
const MICROSOFT_APP_ID = process.env.MICROSOFT_APP_ID || '8fff4c9b-acb4-46f5-8727-f01d908b952c';
const API_AI_TOKEN = process.env.API_AI_TOKEN || 'api_ai';
const MICROSOFT_APP_PASSWORD = process.env.MICROSOFT_APP_PASSWORD || '4yb1Mhemjc6Yz7M4z0Mvp9S';
const LUIS_ENDPOINT = process.env.LUIS_ENDPOINT || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8ddf86d6-38e8-4a6e-ae1b-4ba46f8c92db?subscription-key=afe1452558cb446e96dac551c3c40a64&spellCheck=true&verbose=true&timezoneOffset=0';
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || 'EAABsIS7VNNYBAKWIJGZAVSkDg7zgua4GplhuEGxAAm8EnsCZAuZAMaOBZBWTB8PVfYAAAKJBaYZCrMTugfx1dqxfK856gOlSNci4aZBdSRz4ZChiiBEN7S15u5Lex4ubgc0tpbfsTYJSJkV4zoZBBLBBrgZCjtZCAbb0nXrOJWvyJKTQZDZD';

/*
For Local console testing
*/
/*
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
*/

/*
For Text messages
*/

var connector = new builder.ChatConnector({
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD
});


server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector);

/*
For Calls
*/
var call_connector = new calling.CallConnector({
    callbackUrl: CALLBACK_URL,
    appId: MICROSOFT_APP_ID,
    appPassword: MICROSOFT_APP_PASSWORD
});
server.post('/api/calls', call_connector.listen());
var bot_call = new calling.UniversalCallBot(call_connector);

bot_call.set('storage', new builder.MemoryBotStorage());

bot.use(
    RetrieveUserProfile({
        accessToken: FB_ACCESS_TOKEN,
        expireMinutes: 60,
        fields: ['first_name', 'last_name', 'gender']
    })
);

// var intents = new builder.IntentDialog({
//     recognizers: [recognizer = new builder.LuisRecognizer(LUIS_ENDPOINT)]
// });

var recognizer = new builder.LuisRecognizer(LUIS_ENDPOINT);
bot.recognizer(new builder.LuisRecognizer(LUIS_ENDPOINT));
var intents = new builder.IntentDialog({ recognizers: [recognizer] }) 

console.log(JSON.stringify(intents));

var calling_intents = new builder.IntentDialog({
    recognizers: [recognizer = new builder.LuisRecognizer(LUIS_ENDPOINT)]
});

require('../fulfillment/intents')(intents);
require('../fulfillment/voice')(bot, bot_call, builder, calling);
bot.dialog('/', intents);

intents.onDefault((session, args) => {
    savedAddress = session.message.address;
    session.send("This is my bot");

    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    if (fulfillment) {
        var speech = fulfillment.entity;
        console.log(`Address of the user is ${JSON.stringify(session.message)}`);
        session.send(speech);
    } else {
        session.send('Sorry...not sure how to respond to that');
    }
});