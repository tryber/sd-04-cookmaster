const connection = require('./connection');

const listRecipes = async () => {
  const db = await connection();
  const stmt = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const rows = await stmt.fetchAll();
  const recipes = rows.map(([id, user, name]) => ({ id, user, name }));
  return recipes;
};

const recipesById = async (recipeId) => {
  const db = await connection();
  const stmt = await db
    .getTable('recipes')
    .select([])
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
  const [id, userId, user, name, ingredients, instructions] = await stmt.fetchOne();
  const recipe = { id, userId, user, name, ingredients, instructions };
  // console.log(recipe);
  return recipe;
};

const recipesByUserId = async (userId) => {
  const db = await connection();
  const stmt = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('user_id = :user_id')
    .bind('user_id', userId)
    .execute();
  const recipes = await stmt.fetchAll();
  // console.log(recipes);
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

module.exports = {
  listRecipes,
  recipesById,
  recipesByUserId,
};
