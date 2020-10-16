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

const findRecipeByUserId = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).where('user_id = :user_id').bind('user_id', idInput).execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userId, user, recipe, ingredients, instructions]) => ({
    id, userId, user, recipe, ingredients, instructions,
  }));
};

const getRecipesByName = async (name) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).where('name = :name').bind('name', name).execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userId, user, recipe]) => ({
    id, userId, user, recipe,
  }));
};

const deleteRecipeById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.delete().where('id = :id').bind('id', idInput).execute();
  return result.getWarningsCount();
};

const insertRecipe = async (id, user, name, ingredients, instructions) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.insert([
    'user_id', 'user', 'name', 'ingredients', 'instructions',
  ])
  .values(id, user, name, ingredients, instructions)
  .execute();
  return result.getWarningsCount();
};

module.exports = {
  getRecipes,
  findRecipeById,
  findRecipeByUserId,
  getRecipesByName,
  deleteRecipeById,
  insertRecipe,
};
