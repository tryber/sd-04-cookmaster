const connection = require('./connection');

const findByEmail = async (emailInput) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select()
        .where('email = :userEmail')
        .bind('userEmail', emailInput)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));

const findById = async (idInput) =>
  connection()
    .then((db) =>
      db.getTable('users').select().where('id = :id_param').bind('id_param', idInput).execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));

// -------------------------------------------------
// -------------------------------------------------

// Criar novo usuário
const createUser = (email, password, firstName, lastName) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute(),
  );

// // -------------------------------------------------
// // -------------------------------------------------

const editUser = (id, email, password, firstName, lastName) =>
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

module.exports = {
  findByEmail,
  findById,
  createUser,
  editUser,
};
