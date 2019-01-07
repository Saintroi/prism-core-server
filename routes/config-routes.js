import rootRouter from './routers/root';
import authRouter from './routers/auth';
/**
 * initializes all routes
 * @param {Object} app the app instance
 */

const configRoutes = (app) => {
  app.use('/login', authRouter);
  app.use('/', rootRouter);
};

export default configRoutes;