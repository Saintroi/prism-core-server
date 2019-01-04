var Accountkit = require ('node-accountkit');

Accountkit.set ("APP_ID", "ACCOUNT_KIT_APP_SECRET"); //API_VERSION is optional, default = v1.1
Accountkit.requireAppSecret (true); // if you have enabled this option, default = true

//authorization_code are the authorizaition code that we get from account kit login operation.
Accountkit.getAccountInfo (authorization_code, function(err, resp) {
    /**
    {
        "email": {
            "address": "mail.goyalshubham@gmail.com"
        },
        "id": "941488975973375"
    }
    */
});
// Account Removal
//accountId is accountkit user id
Accountkit.removeUser(accountId, function(err, resp){
    /**
    {
        "success": true
    }
    */
});