import { makeOrderValidations } from '../../../src/validation/pages/order_validation';
import { 
  RequiredFieldValidation, 
  DateValidation, 
  NestedValidation
} from '../../../src/validation/validators/validators';

describe('Customer Create Validations', () => { //Tempo de montagem 07 min e 52 seg 
  it('Should return the correct validations in order create', () => {
    const validations = makeOrderValidations();

    expect(validations).toEqual([
        new RequiredFieldValidation('idCliente'),
        new RequiredFieldValidation('idUsuario'),
        new RequiredFieldValidation('dataCriacao'),
        new DateValidation('dataCriacao'),
        new RequiredFieldValidation('condicaoPagamento'),
        new RequiredFieldValidation('formaPagamento'),
        new RequiredFieldValidation('total'),
        new RequiredFieldValidation('observacao'),
        new RequiredFieldValidation('itemPedidoBeans'),
        new NestedValidation('itemPedidoBeans', [
            new RequiredFieldValidation('idProduto'),
            new RequiredFieldValidation('quantidade'),
            new RequiredFieldValidation('valorUnitario'),
        ]),
    ]);
  });
});