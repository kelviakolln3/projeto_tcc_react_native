import { 
    RequiredFieldValidation, 
    MinLengthValidation, 
    EmailValidation 
  } from '../validators/validators';
  
  export const makeLoginValidations = () => {
    return [
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 3),
    ];
  };