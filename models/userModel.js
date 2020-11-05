const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (mail) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('email = :email').bind('email', mail).execute();
  const user = await result.fetchOne();

  if (!user) return null;

  const [id, email, password, name, lastName] = user;

  return {
    id, email, password, name, lastName,
  };
};

const findById = async (userId) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :id').bind('id', userId).execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return {
    id, email, password, name, lastName,
  };
};

const signUpUserModel = async (email, password, firstName, lastName) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
  return result;
};

const userUpdate = async (Id, name, lastName, password, email) => {
  const db = await connection();
  const result = await db.getTable('users')
    .update()
    .set('password', password)
    .set('email', email)
    .set('first_name', name)
    .set('last_name', lastName)
    .where('id = :id')
    .bind('id', Id)
    .execute();
  return result;
};

module.exports = {
  findByEmail,
  findById,
  signUpUserModel,
  userUpdate,
};
