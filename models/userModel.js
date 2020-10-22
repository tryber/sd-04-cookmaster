/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */

// const { connect } = require('mysql2');
const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, emailUser, password, name, lastName]) => ({
      id,
      emailUser,
      password,
      name,
      lastName,
    }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([idUser, email, password, name, lastName]) => ({
      idUser,
      email,
      password,
      name,
      lastName,
    }));
};

/* CRIAR A FUNÇÃO DE CRIAR O USUÁRIO NO BANCO */

const createUser = async ({ email, password, first_name, last_name }) => {
  const db = await connection();
  await db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, first_name, last_name)
    .execute();
};

const saveEdit = async (id, email, password, firstName, lastName) => {
  connection().then((db) =>
    db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  saveEdit,
};
