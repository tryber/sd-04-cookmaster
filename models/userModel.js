const connection = require('./connection')

const findByEmail = async (userEmail) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select().where('email = :email').bind('email', userEmail).execute();
  const user = await result.fetchOne();
  
  if (!user) return null;

  const [id, email, password, firstName, lastName] = user;

  return {
    id, email, password, firstName, lastName,
  };
};

const findById = async (userId) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select().where('id = :id').bind('id', userId).execute();
  const user = await result.fetchOne();
  
  if (!user) return null;

  const [id, email, password, firstName, lastName] = user;

  return {
    id, email, password, firstName, lastName,
  };
};

module.exports = {
  findByEmail,
  findById,
};
