import Check from './check';

class FormValidator {
  constructor(data, defaultErrorMessage, specificErrors) {
    this.data = Object.assign({}, data);
    this.valid = true;
    this.passed = {};
    this.errors = {};
    this.defaultErrorMessage = defaultErrorMessage;
    this.specificErrors = specificErrors;
  }

  setDefaultErrorMessage(message) {
    this.defaultErrorMessage = message;
  }

  verify(key, message) {
    this.passed[key] = this.data[key];
    return new Check(this, key, this.data[key], message);
  }

  setError(key, message) {
    this.valid = false;
    this.errors[key] = message;
  }

  validate() {
    return new Promise((resolve, reject) => {
      if (this.valid) return resolve(this.passed);
      if (this.specificErrors) return reject(this.errors);
      return reject(new Error(this.defaultErrorMessage));
    });
  }
}

export default FormValidator;