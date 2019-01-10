import passport from 'passport';
import auth0 from 'passport-auth0';
import config from 'config';

var strategy = new auth0(
    {
      domain: config.auth0.domain,
      clientID: config.auth0.clientid,
      clientSecret: config.auth0.secret,
      callbackURL:
        config.auth0.callback || 'http://localhost:3000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(strategy);

export default passport