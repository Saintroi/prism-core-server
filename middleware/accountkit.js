var Accountkit = require ('node-accountkit');
import config from './config'

Accountkit.set (config.get('accountkit.appid'), config.get('accountkit.secret')); //API_VERSION is optional, default = v1.1
Accountkit.requireAppSecret (true); // if you have enabled this option, default = true

//authorization_code are the authorizaition code that we get from account kit login operation.
Accountkit.getAccountInfo (authorization_code, function(err, resp) {
    console.log(err, resp);
});
// Account Removal
//accountId is accountkit user id
Accountkit.removeUser(accountId, function(err, resp){
    console.log(err, resp);
});