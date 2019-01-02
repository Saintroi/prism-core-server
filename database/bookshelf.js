import bookshelf from 'bookshelf';
import knex from './knex';

const bookshelfInstance = bookshelf(knex);

bookshelfInstance.plugin('registry');
bookshelfInstance.plugin('bookshelf-camelcase');

export default bookshelfInstance;