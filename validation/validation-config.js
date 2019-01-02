const validationConfig = {
    login(validator) {
      validator.setDefaultErrorMessage('Email address or mobile number required.');
  
      validator.verify('email')
        .isRequired('Email cannot be left empty.')
        .isEmail('Must provide a valid email address.');
  
      validator.verify('cellPhone')
        .isRequired('Must provide a valid mobile number.');
    },
    passwordResetRequest(validator) {
      validator.setDefaultErrorMessage('Email address is required.');
  
      validator.verify('email')
        .isRequired('Email cannot be left empty.')
        .isEmail('Must provide a valid email address.');
    },
    getUser(validator) {
      validator.verify('email')
        .isRequired('No email provided.')
        .isEmail('Invalid email provided.');
    },
    createUser(validator) {
      validator.verify('email')
        .isRequired('Email cannot be left empty.')
        .isEmail('Must be valid email address.');
  
      validator.verify('firstName')
        .isRequired('First name is required.');
  
      validator.verify('lastName')
        .isRequired('Last name is required.');
  
      validator.verify('cellPhone')
        .isPhone('Must be a valid phone number.');

      validator.verify('officePhone')
      .isPhone('Must be a valid phone number.');
    },
    email(validator) {
      validator.setDefaultErrorMessage('Unable to send email message.');
  
      validator.verify('to')
        .isRequired()
        .isEmail();
  
      validator.verify('subject')
        .isRequired();
  
      validator.verify('html');
      validator.verify('text');
    },
  };
  
  export default validationConfig;