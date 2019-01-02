import express from 'express';
import http from 'http';
import setup from './utils/setup';
import schema from './schema';

const app = express();
const server = http.createServer(app);

setup.configure(app);
//schema.applyMiddleware({
//  app
//});
setup.start(server);

export default {
  app,
  server
};