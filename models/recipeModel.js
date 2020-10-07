const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const recipes = results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeById = async (idInput) => {
  const db = await connection();
  const result = await db
    .getTable('recipes')
    .select([])
    .where('id = :id')
    .bind('id', idInput)
    .execute();
  const [id, userId, user, name, ingredients, instructions] = await result.fetchOne();
  return { id, userId, user, name, ingredients, instructions };
};

const getRecipesByName = async (q) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :q')
    .bind('q', `%${q}%`)
    .execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, user, name]) => ({
    id,
    user,
    name,
  }));
};



module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByName,
};
