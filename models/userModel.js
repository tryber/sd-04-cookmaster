const connection = require('./connection');

const getUser = (userData) => {
  const [email, password, id, firstName, lastName] = userData;
  return { email, password, id, name: firstName, lastName };
};

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const userData = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['email', 'password', 'id', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) => users[0]);

  if (!userData) return null;

  return getUser(userData);
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const userData = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['email', 'password', 'id', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) => users[0]);

  if (!userData) return null;

  return getUser(userData);
};

// Cadastrar um novo usuário

const newUser = async (email, password, firstName, lastName) => {
  await connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password[0], firstName, lastName)
      .execute(),
  );
};

// Editar os dados de um usuário

const editUser = async (userID, email, password, firstName, lastName) => {
  await connection().then((db) =>
    db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .where('id = :userID')
      .bind('userID', userID)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  newUser,
  editUser,
};
