const connection = require('./connection');

const findByEmail = async (email) => {
  const emailData = await connection()
    .then((db) =>
      db.getTable('users').select([]).where('email = :email').bind('email', email).execute(),
    )
    .then((results) => results.fetchAll());

  const user = {};
  [user.id, user.email, user.password, user.first_name, user.last_name] = emailData[0];
  return user;
};

const findById = async (id) => {
  const idData = await connection()
    .then((db) => db.getTable('users').select([]).where('id = :id').bind('id', id).execute())
    .then((results) => results.fetchAll());

  const user = {};
  [user.id, user.email, user.password, user.first_name, user.last_name] = idData[0];
  return user;
};

module.exports = {
  findByEmail,
  findById,
};
