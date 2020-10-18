const connection = require('./connection');

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

const getByText = async (q) => {
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

const createRecipe = async (recipe) => {
  const { id, firstName, name, ingredients, instructions } = recipe;
  const table = await connection().then((db) => db.getTable('recipes'));

  table.insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, firstName, name, ingredients, instructions)
    .execute();
};

// === IIFE teste ===
// (async () => console.log(await getById(4)))();

module.exports = {
  getAll,
  getById,
  getByText,
  createRecipe,
};
