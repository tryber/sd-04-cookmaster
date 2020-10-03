const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['user', 'name']).execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, user, name]) => ({ id, user, name }));

  return list;
};

module.exports = {
  getAllRecipes,
};
