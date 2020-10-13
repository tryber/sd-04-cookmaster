const connection = require('./connection');

const receitaById = async (id) => {
  const idData = await connection()
    .then((db) => db.getTable('recipes').select([]).where('id = :id').bind('id', id).execute())
    .then((results) => results.fetchAll());

  const recipe = {};
  [
    recipe.id,
    recipe.user_id,
    recipe.user,
    recipe.name,
    recipe.ingredients,
    recipe.instructions,
  ] = idData[0];
  return recipe;
};

module.exports = {
  receitaById,
};
