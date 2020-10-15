const connection = require('./connection');

const getRecipes = async () => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).execute();
  const recipes = results.fetchAll();
  return recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const getRecipesById = async (id) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select(['user_id', 'user', 'name', 'ingredients', 'instructions']).where('id = :id').bind('id', id).execute();
  const [userId, user, name, ingredients, instructions] = await results.fetchOne();
  return { userId, user, name, ingredients, instructions };
};

module.exports = {
  getRecipes,
  getRecipesById,
};
