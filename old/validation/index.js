import FormValidator from './validator/form-validator';
import runValidation from './validation-config';

/**
 * validates a particular form or object
 * validation rule sets are defined in ./validation-config.js
 * @param {String} key the form or object type to validate (e.g. login or createOwner)
 * @param {Object}} data the form data
 * @param {Boolean} specificErrors whether to return field-specific error messages (e.g. email)
 */
const validate = (key, data, specificErrors) => {
  const validator = new FormValidator(data, null, specificErrors);
  if (runValidation[key]) {
    runValidation[key](validator);
    return validator.validate();
  }

  return Promise.reject(new Error(`Invalid validation key "${key}".`));
};

export default validate;