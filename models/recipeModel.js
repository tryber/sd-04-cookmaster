const connection = require('./connection');

// implementar o método para consultar o BD
const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const recipeById = async ({ id }) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([recipeId, userId, user, name, ingredients, instructions]) => ({
      recipeId,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

// const addNewRecipe = async (userId, user, name, ingredients, instructions) =>
//   connection().then((db) =>
//     db
//       .getTable('recipes')
//       .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
//       .values(userId, user, name, ingredients, instructions)
//       .execute(),
// );
// métodos exportados para o controller
module.exports = {
  findAll,
  recipeById,
  // addNewRecipe,
};
