const conn = require('./connection');

const getAllRecipes = async () => {
  const db = await conn();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute();

  const recipes = results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeById = async (id) => {
  const db = await conn();
  const results = await db
    .getTable('recipes')
    .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const [userId, user, name, ingredients, instructions] = await results.fetchOne();
  return { id, userId, user, name, ingredients, instructions };
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};
