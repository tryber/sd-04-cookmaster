const connection = require('./connection');

const registerNewRecipe = async (user_id, user, name, ingredients, instructions) => {
  connection()
  .then((db) =>
  db
  .getTable('recipes')
  .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
  .values(user_id, user, name, ingredients, instructions)
  .execute(),
  );
};

module.exports = registerNewRecipe;
