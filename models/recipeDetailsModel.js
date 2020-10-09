const connection = require('./connection');

const recipeDetailsById = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'name', 'user', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', userId)
    .execute();
  const details = await results.fetchAll();
  return details.map(([id, name, user, ingredients, instructions]) => ({
    id,
    name,
    user,
    ingredients,
    instructions,
  }))[0];
};

module.exports = {
  recipeDetailsById,
};
