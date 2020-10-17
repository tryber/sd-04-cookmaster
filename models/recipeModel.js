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

// === IIFE teste ===
// (async () => console.log(await getById(4)))();

module.exports = {
  getAll,
  getById,
};
