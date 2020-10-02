const connection = require('./connection');

const emailValidator = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const passwordValidator = /^(\d|\w){6,}$/;
const namesValidator = /\w{3,}/;

const validation = ({ email, password, passwordConfirmation, first_name, last_name }) => {
  switch (true) {
    case !emailValidator.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case !passwordValidator.test(password):
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case password !== passwordConfirmation:
      return { message: 'As senhas tem que ser iguais' };
    case !namesValidator.test(first_name):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !namesValidator.test(last_name):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!' };
      break;
  }
};

const createUser = async ({ email, password, first_name, last_name }) => {
  const db = await connection();
  await db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, first_name, last_name)
    .execute();
};

module.exports = { createUser, validation };
