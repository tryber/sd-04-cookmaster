const connection = require('./connection'); //importar arquivo conexao

const getRecipes = async () => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userId, user, recipe, ingredients, instructions]) => ({
    id,
    userId,
    user,
    recipe,
    ingredients,
    instructions,
  }));
};

const getRecipeById = async (recipeId) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.select([]).where('id = :id').bind('id', recipeId).execute();
  const [id, userId, user, title, ingredientsArray, instructions] = await result.fetchOne();
  const ingredients = ingredientsArray.split(',');
  return { id, userId, user, title, ingredients, instructions };
};

module.exports = { getRecipes, getRecipeById };
