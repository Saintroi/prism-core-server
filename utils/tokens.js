import jwksClient from 'jwks-rsa';

const tokens = {}

tokens.client = jwksClient({
    jwksUri: `https://prismcore.auth0.com/.well-known/jwks.json`
  });

  tokens.getKey = (header, cb) => {
      try{
      tokens.client.getSigningKey(header.kid, function(err, key) {
        var signingKey = null;
          if(key){
             signingKey = key.publicKey || key.rsaPublicKey;
          }
             cb(null, signingKey);
      });
    }
    catch (error){
        console.log(error);
    }
    }

  tokens.options = {
    aud: 'http://157.230.5.241',
    issuer: `https://prismcore.auth0.com/`,
    algorithms: ['RS256']
  };

  export default tokens;