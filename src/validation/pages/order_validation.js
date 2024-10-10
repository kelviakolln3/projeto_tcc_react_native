import { 
    RequiredFieldValidation,  
    DateValidation, 
    NestedValidation
  } from '../validators/validators';
  
  export const makeOrderValidations = () => {
    return [
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
    ];
  };