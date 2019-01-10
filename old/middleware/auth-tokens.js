var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const client = jwksClient({
    jwksUri: "https://prismcore.auth0.com/.well-known/jwks.json"
})

client.getKey = (header, cb) =>{
    client.getSigningKey(header.kid, function(err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      cb(null, signingKey);
    });
  }

client.options = {
    audience: 'http://157.230.5.241',
    issuer: 'https://prismcore.auth0.com/',
    algorithms: ['RS256']
    };

export default client;