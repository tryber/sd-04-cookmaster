const connection = require('./connection');

const getRecipes = async () => {
  try {
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
  } catch {
    return null;
  }
};

const getRecipesById = async (inputId) => {
  try {
    const db = await connection();
    const table = await db.getTable('recipes');
    const results = await table.select([]).where('id = :inputId').bind('inputId', inputId).execute();
    const [id, userId, user, name, ingredients, instructions] = await results.fetchOne();
    return { id, userId, user, name, ingredients, instructions };
  } catch {
    return null;
  }
};

const getRecipesByName = async (q) => {
  try {
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
  } catch {
    return null;
  }
};

module.exports = {
  getRecipes,
  getRecipesById,
  getRecipesByName,
};
