import { makeLoginValidations } from '../../../src/validation/pages/login_validation';
import { 
  RequiredFieldValidation, 
  MinLengthValidation, 
  EmailValidation 
} from '../../../src/validation/validators/validators';

describe('Login Create Validations', () => { //Tempo de montagem 03 min e 54 seg 
  it('Should return the correct validations', () => {
    const validations = makeLoginValidations();

    expect(validations).toEqual([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 3),
    ]);
  });
});