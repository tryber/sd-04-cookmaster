const connection = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await connection();
  const result = await db
    .getTable('users')
    .select([])
    .where('email = :email')
    .bind('email', emailInput)
    .execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

const addUser = async (email, password, firstName, lastName) =>
  connection().then((bd) =>
    bd
      .getTable('users')
      .insert('email', 'password', 'first_name', 'last_name')
      .values(email, password, firstName, lastName)
      .execute(),
  );

module.exports = {
  findByEmail,
  findById,
  addUser,
};
