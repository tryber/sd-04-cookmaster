const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const allTable = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const results = allTable.fetchAll();
  return results.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeById = async (Id) => {
  const db = await connection();
  const table = await db.getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', Id)
    .execute();
  const results = await table.fetchOne();
  const [id, user, name, ingredients, instructions] = results;
  // const ingredients = await results[3].slice(',');
  return { id, user, name, ingredients, instructions };
};

module.exports = {
  getAll,
  getRecipeById,
};
