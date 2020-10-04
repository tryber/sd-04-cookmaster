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

const findRecipeById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, userId, user, title, ingredientsString, instructions] = await result.fetchOne();
  const ingredients = ingredientsString.split(',');
  return { id, userId, user, title, ingredients, instructions };
};

module.exports = {
  getRecipes,
  findRecipeById,
};
