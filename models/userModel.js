const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (uEmail) => {
  const table = await connection().then((db) => db.getTable('users'));
  const register = await table
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', uEmail)
    .execute();

  return register.fetchAll()
    .map(([id, email, password, firstName, lastName]) =>
      ({ id, email, password, firstName, lastName }))[0];
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (uId) => {
  const table = await connection().then((db) => db.getTable('users'));
  const register = await table
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', uId)
    .execute();

  return register.fetchAll()
    .map(([id, email, password, firstName, lastName]) =>
      ({ id, email, password, firstName, lastName }))[0];
};

const validateFullName = (firstName, lastName) => {
  if (firstName.length < 3) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  if (lastName.length < 3) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return 'ok';
};

const validateUser = (user) => {
  const { email, password, cPassword, nome, sobrenome } = user;
  const validateEmail = (vEmail) =>
    /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(vEmail);

  if (!validateEmail(email)) {
    return 'O email deve ter o formato email@mail.com';
  }
  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  if (password !== cPassword) {
    return 'As senhas tem que ser iguais';
  }

  return validateFullName(nome, sobrenome);
};

const createUser = async (user) => {
  const { email, password, nome, sobrenome } = user;
  const table = await connection().then((db) => db.getTable('users'));

  table.insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, nome, sobrenome)
    .execute();
};

const updateUser = async (user) => {
  const { id, email, password, nome, sobrenome } = user;
  const table = await connection().then((db) => db.getTable('users'));

  table.update()
    .set('email', email)
    .set('password', password)
    .set('first_name', nome)
    .set('last_name', sobrenome)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  validateUser,
  updateUser,
};
