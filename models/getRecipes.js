const connection = require('./connection');

const getRecipes = async () => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userId, user, recipe, ingredients, instructions]) => ({
    id, userId, user, recipe, ingredients, instructions,
  }));
};

module.exports = { getRecipes };
