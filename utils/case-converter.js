import { snakeCase, camelCase } from 'lodash';

const caseConverter = {};

/**
 * Converts the keys of an object using any conversion function
 * @param {*} val
 * @param {Function} converter the conversion function use
 */
const convert = (val, converter) => {
  if (typeof val !== 'object' || val == null) return val;

  if (Array.isArray(val)) {
    return val.map(item => convert(item, converter));
  }

  return Object.keys(val).reduce((built, key) => {
    return Object.assign(built, { [converter(key)]: convert(val[key], converter) });
  }, {});
};

/**
 * converts the keys of an object to snake_case
 * @param {Object} val
 */
caseConverter.toSnakeCase = val => convert(val, snakeCase);

/**
 * converts the keys of an object to camelCase
 * @param {Object} val
 */
caseConverter.toCamelCase = val => convert(val, camelCase);

export default caseConverter;
