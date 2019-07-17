import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {GraphQLClient, ClientContext} from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache'
import auth from './auth';
import config from './config';

import 'tachyons';
import './index.css';

import registerServiceWorker from './serviceWorker';


const client = new GraphQLClient({
  url: config.serverUrl + '/graphql',
  cache: memCache(),
  headers: {
    authorization: auth.getIdToken(),
      },
  });

ReactDOM.render(
  <BrowserRouter>
    <ClientContext.Provider value={client}>
      <App />
    </ClientContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();