const connection = require('./connection');

async function getAllRecipes() {
  const dbcookmaster = await connection();
  const result = await dbcookmaster.getTable('recipes').select(['id', 'user', 'name']).execute();
  const data = await result.fetchAll();

  return data.map(([id, user, name]) => ({ id, user, name }));
}

async function getRecipe(recipeId) {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', recipeId)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, idUser, user, name, ingredients, instructions]) => ({
      id,
      idUser,
      user,
      name,
      ingredients,
      instructions,
    }));
}

module.exports = { getAllRecipes, getRecipe };
