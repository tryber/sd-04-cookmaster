const connection = require('./connection');

const registerNewRecipe = async (useId, user, name, ingredients, instructions) => {
  connection()
  .then((db) =>
  db
  .getTable('recipes')
  .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
  .values(useId, user, name, ingredients, instructions)
  .execute(),
  );
};

module.exports = registerNewRecipe;
