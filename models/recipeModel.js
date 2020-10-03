const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute();

  const recipes = results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getAllRecipesByUser = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, userId, user, name, lastName, ingredients, instructions] = await result.fetchAll();
  return { id, userId, user, name, lastName, ingredients, instructions };
};

module.exports = {
  getAllRecipes,
  getAllRecipesByUser,
};
