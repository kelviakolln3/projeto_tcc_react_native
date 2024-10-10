import { 
    RequiredFieldValidation, 
    MinLengthValidation, 
    CpfValidation, 
    DateValidation, 
    PhoneValidation, 
    EmailValidation 
  } from '../validators/validators';
  
  export const makeCustumerValidations = () => {
    return [
      new RequiredFieldValidation('codigo'),
      new RequiredFieldValidation('nome'),
      new RequiredFieldValidation('cpf'),
      new MinLengthValidation('cpf', 11),
      new CpfValidation('cpf'),
      new RequiredFieldValidation('rg'),
      new RequiredFieldValidation('endereco'),
      new RequiredFieldValidation('dataNasc'),
      new DateValidation('dataNasc'),
      new RequiredFieldValidation('contato'),
      new PhoneValidation('contato'),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
    ];
  };