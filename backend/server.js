import express from 'express';
import server from './schema';
import configMiddleware from './middleware/config-middleware';
import configRoutes from './routes/config-routes';

const app = express();

// Middleware: GraphQL
server.applyMiddleware({
  app: app
});

// Express: Port
const port = process.env.PORT || 4000;

// Express: configure middleware and routes
configRoutes(app);
//configMiddleware(app);

// Express: Listener
app.listen(port, () => {
  console.log(`The server has started on port: ${port}`);
  console.log(`http://localhost:${port}/graphql`);
})

export default app;