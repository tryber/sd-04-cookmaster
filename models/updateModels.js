const connection = require('./connection');

const updateRecipe = async (id, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update(['name', 'ingredients', 'instructions'])
      .set(name, ingredients, instructions)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

module.exports = {
  updateRecipe,
};
