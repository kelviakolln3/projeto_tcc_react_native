import { makeCustumerValidations } from '../../../src/validation/pages/custumer_validation';
import { 
  RequiredFieldValidation, 
  MinLengthValidation, 
  CpfValidation, 
  DateValidation, 
  PhoneValidation, 
  EmailValidation 
} from '../../../src/validation/validators/validators';

describe('Customer Create Validations', () => { //Tempo de montagem 20 min e 46 seg 
  it('Should return the correct validations in custumers create', () => {
    const validations = makeCustumerValidations();

    expect(validations).toEqual([
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
    ]);
  });
});