import { 
    RequiredFieldValidation, 
  } from '../validators/validators';
  
  export const makeProductValidations = () => {
    return [
        new RequiredFieldValidation('codigo'),
        new RequiredFieldValidation('nome'),
        new RequiredFieldValidation('codigoBarras'),
        new RequiredFieldValidation('estoque'),
        new RequiredFieldValidation('grupo'),
        new RequiredFieldValidation('marca'),
        new RequiredFieldValidation('valorVenda'),
    ];
  };