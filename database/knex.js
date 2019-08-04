import knex from 'knex';
import config from 'config';
import path from 'path';

const knexInstance = knex({
  client: 'mysql',
  connection: config.get('database.connection'),
});

knexInstance.migrate.latest({
  directory: path.join(__dirname, '/migrations'),
});

export default knexInstance;