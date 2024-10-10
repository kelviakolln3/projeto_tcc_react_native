import { makeSupplierValidations } from '../../../src/validation/pages/supplier_validation';
import { 
  RequiredFieldValidation, 
  PhoneValidation, 
  EmailValidation 
} from '../../../src/validation/validators/validators';

describe('Customer Create Validations', () => { //Tempo de montagem 02 min e 10 seg 
  it('Should return the correct validations in suppliers create', () => {
    const validations = makeSupplierValidations();

    expect(validations).toEqual([
        new RequiredFieldValidation('codigo'),
        new RequiredFieldValidation('atividade'),
        new RequiredFieldValidation('empresa'),
        new RequiredFieldValidation('contato'),
        new PhoneValidation('contato'),
        new RequiredFieldValidation('endereco'),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
    ]);
  });
});