const conn = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await conn();
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
  const db = await conn();
  const table = await db
    .getTable('users');
  const result = await table
    .select([])
    .where('id = :id')
    .bind('id', idInput)
    .execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

const addUser = async(email, password, firstName, lastName) => {
  const db = await conn();
  return db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
};

const emailIsValid = (email = '') => email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

const passwordIsValid = (password = '') => password.length > 5;

const confirmPass = (password = '', confirmPass = '') => (password === confirmPass);

const nameIsValid = (name = '') => name.match(/^\w{3,}/i);

module.exports = {
  findByEmail,
  findById,
  addUser,
  emailIsValid,
  passwordIsValid,
  confirmPass,
  nameIsValid,
};
