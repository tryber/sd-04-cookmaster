const connection = require('./connection');

const validation = ({ email, password, passwordConfirmation, first_name, last_name }) => {
  if (!/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email))
    return { valid: false, message: 'O email deve ter o formato email@mail.com' };
  if (!/^(\d|\w){6,}$/.test(password))
    return { valid: false, message: 'A senha deve ter pelo menos 6 caracteres' };
  if (password !== passwordConfirmation)
    return { valid: false, message: 'As senhas tem que ser iguais' };
  if (!/\w{3,}/.test(first_name))
    return {
      valid: false,
      message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    };
  if (!/\w{3,}/.test(last_name))
    return {
      valid: false,
      message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
    };

  return { valid: true, message: 'Cadastro efetuado com sucesso!' };
};

const createUser = async ({ email, password, first_name, last_name }) => {
  const db = await connection();
  const createRow = await db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, first_name, last_name)
    .execute();
};

module.exports = { createUser, validation };
