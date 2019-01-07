import express from 'express';
import server from './schema';
import forceHttps from './middleware/force-https';
import config from 'config';
import errorHandler from './middleware/errors';
import configRoutes from './routes/config-routes';

const app = express();

// Middleware: GraphQL
server.applyMiddleware({
  app: app
});

// Express: Port
const port = process.env.PORT || 4000;

// Express: Setup
if (config.get('env') === 'production') app.use(forceHttps);
<<<<<<< HEAD
configRoutes(app);
app.use(errorHandler);

=======
app.use(errorHandler);
configRoutes(app);
>>>>>>> 6568ac3d50946766a758df0981a5ba7d8ae25af3

// Express: Listener
app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
  console.log(`http://localhost:${port}/graphql`);
})

export default app;