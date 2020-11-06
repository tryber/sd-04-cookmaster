const connection = require('./connection');

const findByEmail = async (userEmail) => {
  const user = await connection()
    .then((db) =>
      db.getTable('users').select([]).where('email = :email').bind('email', userEmail).execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }))
    .catch((err) => {
      throw err;
    });
  return user;
};

const findById = async (userId) => {
  const user = await connection()
    .then((db) => db.getTable('users').select([]).where('id = :id').bind('id', userId)
    .execute())
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }))
    .catch((error) => {
      throw error;
    });
  return user;
};

const addUser = async (email, password, firstName, lastName) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values([email, password, firstName, lastName])
      .execute(),
  );
};

const isValidEmail = (email) => {
  if (email === '') return false;

  return true;
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  isValidEmail,
};
