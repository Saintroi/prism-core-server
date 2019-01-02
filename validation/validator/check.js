import validator from 'validator';

validator.isNotEmpty = val => !validator.isEmpty(val);
validator.isPhone = val => validator.isMobilePhone(val, 'en-US');

const checks = [
  'isInt',
  'isAlpha',
  'isBoolean',
  'isEmail',
  'isDecimal',
  'isEmpty',
  'isNotEmpty',
  'isNumeric',
  'isPhone',
];

class Check {
  constructor(formValidator, key, val, defaultMessage) {
    this.formValidator = formValidator;
    this.key = key;
    this.defaultMessage = defaultMessage;
    this.val = val;
    this.valid = true;
  }

  setError(message) {
    const errorMessage = !message || message === '' ? this.defaultMessage : message;
    this.valid = false;
    this.formValidator.setError(this.key, errorMessage);
  }

  isRequired(message) {
    if (this.val == null || this.val === '') this.setError(message);
    return this;
  }
}

checks.forEach((check) => {
  Check.prototype[check] = function validate(message) {
    if (!this.valid || this.val == null) return this;
    if (!validator[check](this.val)) this.setError(message);

    return this;
  };
});

export default Check;