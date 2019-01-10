import jwksClient from 'jwks-rsa';
import config from 'config';

const tokens = {}

tokens.client = jwksClient({
    jwksUri: `https://prismcore.auth0.com/.well-known/jwks.json`
  });

  tokens.getKey = (header, cb) => {
      tokens.client.getSigningKey(header.kid, function(err, key) {
          var signingKey = key.publicKey || key.rsaPublicKey;
          cb(null, signingKey);
      });
  }

  tokens.options = {
    audience: config.get('auth0.clientid'),
    issuer: `https://prismcore.auth0.com/`,
    algorithms: ['RS256']
  };

  export default tokens;