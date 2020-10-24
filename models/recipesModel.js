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

const getRecipesById = async (inputId) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).where('id = :inputId').bind('inputId', inputId).execute();
  const [id, userId, user, name, ingredients, instructions] = await results.fetchOne();
  return { id, userId, user, name, ingredients, instructions };
};

const getRecipesByName = async (q) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).where('name like :q').bind('q', `%${q}%`).execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const createNewRecipe = async (userId, user, recipeName, ingredients, instructions) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const insertRecipe = await table.insert([
    'user_id', 'user', 'name', 'ingredients', 'instructions',
  ])
  .values(userId, user, recipeName, ingredients, instructions).execute();
  return insertRecipe;
};

module.exports = {
  getRecipes,
  getRecipesById,
  getRecipesByName,
  createNewRecipe,
};
