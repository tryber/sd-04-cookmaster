const connection = require('./connection');
require('dotenv/config');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  try {
    const db = await connection();
    const results = await db
      .getTable('users')
      .select([])
      .where('email = :email')
      .bind('email', email)
      .execute();

    const user = {};
    [user.id, user.email, user.password, user.name, user.lastName] = await results.fetchOne();

    return user;
  } catch (err) {
    return err;
  }
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  try {
    const db = await connection();
    const results = await db
      .getTable('users')
      .select([])
      .where('id = :id')
      .bind('id', id)
      .execute();

    const user = {};
    [user.id, user.email, user.password, user.name, user.lastName] = await results.fetchOne();

    return user;
  } catch (err) {
    return err;
  }
};

const addUser = async (email, password, name, lastName) => {
  try {
    const db = await connection();
    await db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, name, lastName)
      .execute();

    return;
  } catch (err) {
    return process.exit(1);
  }
};

module.exports = {
  findByEmail,
  findById,
  addUser,
};
