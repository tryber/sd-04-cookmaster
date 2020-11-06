const connection = require('./connection');

const emailRegex = /[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
const passwordRegex = /^(\d|\w){6,}$/;
const nameRegex = /\w{3,25}/;

const validator = ({ email, password, passwordComparisor, first_name, last_name }) => {
  switch (true) {
    case !emailRegex.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case !passwordRegex.test(password):
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case password !== passwordComparisor:
      return { message: 'As senhas tem que ser iguais' };
    case !nameRegex.test(first_name):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case !nameRegex.test(last_name):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!' };
  }
};

const createUser = ({ email, password, first_name, last_name }) => (
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, first_name, last_name)
      .execute(),
  )
);

module.exports = {
  createUser,
  validator,
};
