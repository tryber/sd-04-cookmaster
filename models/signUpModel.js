const connection = require('./connection');

const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const nameRegex = /[0-9]/;

const isValid = (email, password, confirmPassword, firstName, lastName) => {
  switch (true) {
    case !emailRegex.test(email):
      return { message: 'O email deve ter o formato email@mail.com' };
    case password.length < 6:
      return { message: 'A senha deve ter pelo menos 6 caracteres' };
    case password !== confirmPassword:
      return { message: 'As senhas tem que ser iguais' };
    case firstName.length < 3 || nameRegex.test(firstName):
      return {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    case lastName.length < 3 || nameRegex.test(lastName):
      return {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      };
    default:
      return { message: 'Cadastro efetuado com sucesso!' };
  }
};

const createUser = async (email, password, firstName, lastName) => {
  const db = await connection();
  return db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
};

module.exports = {
  createUser,
  isValid,
};
