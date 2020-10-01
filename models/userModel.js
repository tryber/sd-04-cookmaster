const connection = require('./connection');

const createUserObject = ([id, email, password, name, lastName]) => ({
  id,
  email,
  password,
  name,
  lastName,
});

const findByEmail = async (email) => {
  const user = await connection()
    .then((schema) => {
      const table = schema.getTable('users');
      return table.select([]).where('email = :email').bind('email', email).execute();
    })
    .then((selectResult) => selectResult.fetchOne());
  const userObject = createUserObject(user);
  return userObject;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const user = await connection()
    .then((schema) => {
      const table = schema.getTable('users');
      return table.select([]).where('id = :id').bind({ id }).execute();
    })
    .then((selectResult) => selectResult.fetchOne());
  const userObject = createUserObject(user);
  return userObject;
};

const createNewUser = async ({ email, password, name, lastName }) => {
  connection().then((schema) => {
    const table = schema.getTable('users');
    return table
      .insert('email', 'password', 'first_name', 'last_name')
      .values(email, password, name, lastName)
      .execute();
  });
};

module.exports = {
  findByEmail,
  findById,
  createNewUser,
};
