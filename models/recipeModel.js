const connection = require('./connection');
const { findById } = require('./userModel');

const getAll = async () => {
  const table = await connection().then((db) => db.getTable('recipes'));
  const registers = await table
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .execute();

  return registers.fetchAll()
    .map(([id, userId, user, name, ingredients, instructions]) =>
      ({ id, userId, user, name, ingredients, instructions }));
};

const getById = async (rId) => {
  const table = await connection().then((db) => db.getTable('recipes'));
  const register = await table
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', rId)
    .execute();

  return register.fetchAll()
    .map(([id, userId, user, name, ingredients, instructions]) =>
      ({ id, userId, user, name, ingredients, instructions }))[0];
};

const getByName = async (q) => {
  const table = await connection().then((db) => db.getTable('recipes'));
  const registers = await table
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('name like :q')
    .bind('q', `%${q}%`)
    .execute();

  return registers.fetchAll()
    .map(([id, userId, user, name, ingredients, instructions]) =>
      ({ id, userId, user, name, ingredients, instructions }));
};

const getByUser = async (uId) => {
  const table = await connection().then((db) => db.getTable('recipes'));
  const registers = await table
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('user_id = :id')
    .bind('id', uId)
    .execute();

  return registers.fetchAll()
    .map(([id, userId, user, name, ingredients, instructions]) =>
      ({ id, userId, user, name, ingredients, instructions }));
};

const createRecipe = async (recipe) => {
  const { id, firstName, name, ingredients, instructions } = recipe;
  const table = await connection().then((db) => db.getTable('recipes'));

  table.insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, firstName, name, ingredients, instructions)
    .execute();
};

const updateRecipe = async (recipe) => {
  const { id, name, ingredients, instructions } = recipe;
  const table = await connection().then((db) => db.getTable('recipes'));

  table.update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

const deleteRecipe = async (uId, recId, password) => {
  const user = await findById(uId);
  const uPassword = user.password;

  if (password === uPassword) {
    const table = await connection().then((db) => db.getTable('recipes'));

    table.delete()
      .where('id = :id')
      .bind('id', recId)
      .execute();
  } else {
    throw Error('Senha Incorreta.');
  }
};

// === IIFE teste ===
// (async () => console.log(await getByUser(1)))();

module.exports = {
  getAll,
  getById,
  getByName,
  createRecipe,
  updateRecipe,
  getByUser,
  deleteRecipe,
};
