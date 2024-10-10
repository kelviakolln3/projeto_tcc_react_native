import { 
    RequiredFieldValidation, 
    MinLengthValidation, 
    CpfValidation, 
    DateValidation, 
    PhoneValidation, 
    EmailValidation 
  } from '../validators/validators';
  
  export const makeSupplierValidations = () => {
    return [
      new RequiredFieldValidation('codigo'),
      new RequiredFieldValidation('atividade'),
      new RequiredFieldValidation('empresa'),
      new RequiredFieldValidation('contato'),
      new PhoneValidation('contato'),
      new RequiredFieldValidation('endereco'),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
    ];
  };