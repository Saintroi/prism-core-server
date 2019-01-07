const fs = require('fs');
const Guid = require('guid');
const express = require('express');
const bodyParser = require("body-parser");
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');
const app = express();
<<<<<<< HEAD
import config from './config'
=======
>>>>>>> a4ade8132e741c0993fb33ba59605e0fd900ac16

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
const accountkit = {
  csrf_guid: Guid.raw(),
  account_kit_api_version: 'v1.1',
<<<<<<< HEAD
  app_id: config.accountkit.appid,
  app_secret: config.accountkit.secret,
  me_endpoint_base_url: 'https://graph.accountkit.com/v1.1/me',
  token_exchange_base_url: 'https://graph.accountkit.com/v1.1/access_token'
=======
  app_id: '2070700909677265',
  app_secret: '6231695a42e43e6a5af042e19a029cf3',
  me_endpoint_base_url: 'https://graph.accountkit.com/v1.1/me',
  token_exchange_base_url: 'https://graph.accountkit.com/v1.1access_token'
>>>>>>> a4ade8132e741c0993fb33ba59605e0fd900ac16
}

accountkit.loadLogin = () => {
    return fs.readFileSync('./login.html').toString();
  }
  
accountkit.logIn = (request, response) => {
  var view = {
    appId: this.app_id,
    csrf: this.csrf_guid,
    version: this.account_kit_api_version,
  };

  var html = Mustache.to_html(loadLogin(), view);
  response.send(html);
};

accountkit.loadLoginSuccess = () => {
  return fs.readFileSync('./login_success.html').toString();
}
  
accountkit.logInSuccess = (request, response) => {

  // CSRF check
  if (request.body.csrf === this.csrf_guid) {
    var app_access_token = ['AA', this.app_id, this.app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
    };
  
    // exchange tokens
    var token_exchange_url = this.token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,	
      };

      // get account details at /me endpoint
      var me_endpoint_url = this.me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        // send login_success.html
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }
        var html = Mustache.to_html(loadLoginSuccess(), view);
        response.send(html);
      });
    });
  } 
  else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
};

export default accountkit;
