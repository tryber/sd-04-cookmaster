const connection = require('./connection');

const findByEmail = async (emailInput) => {
  return connection()
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
};

const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select()
        .where('id = :id_param')
        .bind('id_param', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

// -------------------------------------------------
// -------------------------------------------------

// Criar novo usuário
const createUser = (email, password, firstName, lastName) => {
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute(),
  );
};

// // -------------------------------------------------
// // -------------------------------------------------

module.exports = {
  findByEmail,
  findById,
  createUser,
};
