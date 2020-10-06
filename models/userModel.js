const { tables, getTableObj } = require('./connection');
// email regex retirado do stackOverFlow
// link: pt.stackoverflow.com/questions/1386/expressão-regular-para-validação-de-e-mail
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const NAME_REGEX = /[a-zA-Z]{3,}/;

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => getTableObj(
  tables.users((u) => u.select([]).where('email = :email').bind('email', email).execute()),
  'fetchOne',
);

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => getTableObj(
  tables.users((u) => u.select([]).where('id = :id').bind('id', id).execute()),
  'fetchOne',
);

const insertUser = ({
  email, password, firstName, lastName,
}) => tables.users(
  (u) => u.insert(['email', 'password', 'first_name', 'last_name'])
    .values([email, password, firstName, lastName])
    .execute(),
);
// Gambi do CC confesso que senti falta :D
const comparePassword = (message, password, password2) => {
  if (password.length < 6) message.passwordMsg = 'A senha deve ter pelo menos 6 caracteres';
  if (password !== password2) message.password2Msg = 'As senhas tem que ser iguais';
};

const validateNewUser = ({
  email, password, password2, firstName, lastName,
}) => {
  const message = {};

  comparePassword(message, password, password2);

  if (!EMAIL_REGEX.test(email)) message.emailMsg = 'O email deve ter o formato email@mail.com';
  if (!NAME_REGEX.test(firstName)) message.nameMsg = 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  if (!NAME_REGEX.test(lastName)) message.lastNameMsg = 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';

  if (Object.keys(message).length === 0) message.confirmMsg = 'Cadastro efetuado com sucesso!';

  return message;
};

module.exports = {
  findByEmail,
  findById,
  validateNewUser,
  insertUser,
};
