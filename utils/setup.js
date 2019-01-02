import errorHandler from '../middleware/errors';
import configRoutes from '../routes/config-routes';
import auth from '../middleware/auth';
import forceHttps from '../middleware/force-https';
import config from 'config';


const port = process.env.PORT || '4000';
const setup = {};

/**
 * handles initial app setup, adding base middleware
 * @param {Object} app
 */
setup.configure = (app) => {
  app.set('port', port);
  if (config.get('env') === 'production') app.use(forceHttps);

  // setup authentication
  //app.use(auth.bindUser); No Tokens yet

  configRoutes(app);
  app.use(errorHandler);
};

/**
 * starts the server, adds listening and error handlers
 * @param {Object} server
 */
setup.start = (server) => {
  server.listen(port);

  server.on('listening', () => {
    // add any necessary post-startup code here
  });

  server.on('error', (err) => {
    throw err;
  });
};

export default setup;