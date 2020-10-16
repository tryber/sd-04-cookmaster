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

// === IIFE teste ===
// (async () => console.log(await getAll()))();

module.exports = {
  getAll,
};
