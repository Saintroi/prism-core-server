import errorHandler from './middleware/errors';
import configRoutes from './routes/config-routes';
import client from './middleware/auth-tokens';
import passport from './middleware/passport';
import session from 'express-session'
import forceHttps from './middleware/force-https';
import config from 'config';
import userInViews from 'userInViews';


/**
 * initializes all routes
 * @param {Object} app the app instance
 */

const configMiddleware = (app) => {
    var sess = {
        secret: 'memesarelife',
        cookie: {},
        resave: false,
        saveUninitialized: true
      }

      if (config.get('env') === 'production') {
        app.use(forceHttps);
        sess.cookie.secure = true;
      }

    app.use(session(sess));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(userInViews);
    configRoutes(app);
    app.use(client);
    app.use(errorHandler);


};

export default configMiddleware;