const connection = require('./connection');

async function getAllRecipes() {
  const dbcookmaster = await connection();
  const result = await dbcookmaster.getTable('recipes').select(['user', 'name']).execute();
  const data = await result.fetchAll();

  return data.map(([user, name]) => ({ user, name }));
}

async function getRecipesByUserId(userId) {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then(([id, idUser, user, name, ingredients, instructions]) => ({
      id,
      idUser,
      user,
      name,
      ingredients,
      instructions,
    }));
}

module.exports = { getAllRecipes, getRecipesByUserId };
