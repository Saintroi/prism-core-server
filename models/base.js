import bookshelf from '../database/bookshelf';
import caseConverter from '../utils/case-converter';

/**
 * Base Bookshelf Model
 * provides automatic camelCase -> snake_case conversion when querying and other functions
 * all other models should extend this
 */
export default bookshelf.Model.extend({
  where(...args) {
    const query = args.slice(0);

    if (typeof query[0] === 'object') {
      query[0] = caseConverter.toSnakeCase(query[0]);
    }

    bookshelf.Model.prototype.where.apply(this, query);
    return this;
  },
});