import { makeProductValidations } from '../../../src/validation/pages/product_validation';
import { 
  RequiredFieldValidation,
} from '../../../src/validation/validators/validators';

describe('Login Create Validations', () => { //Tempo de montagem 03 min e 24 seg 
  it('Should return the correct validations in product create', () => {
    const validations = makeProductValidations();

    expect(validations).toEqual([
        new RequiredFieldValidation('codigo'),
        new RequiredFieldValidation('nome'),
        new RequiredFieldValidation('codigoBarras'),
        new RequiredFieldValidation('estoque'),
        new RequiredFieldValidation('grupo'),
        new RequiredFieldValidation('marca'),
        new RequiredFieldValidation('valorVenda'),
    ]);
  });
});