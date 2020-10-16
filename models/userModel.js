const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

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

// === Versão com then ===
// connection()
//   .then((db) =>
//     db.getTable('users')
//       .select(['id', 'email', 'password', 'first_name', 'last_name'])
//       .where('email = :email')
//       .bind('email', email)
//       .execute()
//   )
//   .then((result) => result.fetchAll())
//   .then((user) => user);

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

// === IIFE teste ===
// (async () => console.log(await findById(3)))();

module.exports = {
  findByEmail,
  findById,
  createUser,
  validateUser,
};
