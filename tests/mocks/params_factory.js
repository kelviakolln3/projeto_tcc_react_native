import { faker } from '@faker-js/faker';

export const mockCreateCustumer = () => {
    return {
        codigo: faker.number.int(),
        nome: faker.person.fullName(),
        cpf: faker.string.alpha(14),
        rg: faker.number.int({ max: 1000 }).toString(),
        endereco: faker.location.streetAddress(),
        dataNasc: faker.date.past().toISOString(),
        contato: faker.phone.number(),
        email: faker.internet.email(),
    };
};

export const mockCreateOrder = () => {
    return {
        idCliente: 52,
        idUsuario: 1,
        dataCriacao: faker.date.recent().toISOString(),
        condicaoPagamento: faker.string.alpha(10),
        formaPagamento: faker.string.alpha(10),
        total: faker.number.float(),
        itemPedidoBeans: [
            {
                idProduto: 3,
                quantidade: faker.number.float(),
                valorUnitario: faker.number.float(),
            }
        ]
    };
};

export const mockCreateProduct = () => {
    return {
        codigo: faker.number.int(),
        nome: faker.string.alpha(20),
        codigoBarras: faker.number.int(14).toString(),
        estoque: faker.number.float(),
        grupo: faker.string.alpha(10),
        marca: faker.string.alpha(10),
        valorVenda: faker.number.float(),
    };
};

export const mockCreateSupplier = () => {
    return {
        codigo: faker.number.int(),
        atividade: faker.string.alpha(20),
        empresa: faker.string.alpha(20),
        contato: faker.phone.number(),
        endereco: faker.location.streetAddress(),
        email: faker.internet.email(),
    };
};
