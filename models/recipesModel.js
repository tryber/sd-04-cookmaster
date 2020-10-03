const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['user', 'name']).execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, user, name]) => ({ id, user, name }));

  return list;
};

const getRecipeById = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind(('id', userId))
    .execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([name, ingredients, instructions]) => ({
    name,
    ingredients,
    instructions,
  }));

  return list;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};
