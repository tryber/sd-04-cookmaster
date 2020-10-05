const connection = require('./connection');

// implementar o método para consultar o BD
const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const newRecipe = async (userId, user, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
  );
// métodos exportados para o controller
module.exports = {
  findAll,
  newRecipe,
};
