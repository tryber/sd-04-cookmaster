const connection = require('./connection');

const listRecipes = async () => {
  const db = await connection();
  const stmt = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const rows = await stmt.fetchAll();
  const recipes = rows.map(([id, user, name]) => ({ id, user, name }));
  return recipes;
};

module.exports = {
  listRecipes,
};
