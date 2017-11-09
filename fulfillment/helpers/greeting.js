var builder = require('botbuilder');

module.exports = [

    // Destination
    function (session) {
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
        session.send('Welcome to TCS Aider help App');
        builder.Prompts.choice(session, "Please choose 1 of the given options",userdetails );
        
    },
    // Check-in
    function (session,results) {
        if (results.response) {
            session.send(results.response.entity);
            var data = session.userdetails[results.response.entity];
            session.endDialog();
            
        } else {
             session.endDialogWithResult("OK");
        }
    },
    
   
];

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};