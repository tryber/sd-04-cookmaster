const connection = require('./connection');

const recipeEditModel = async (id, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .update()
        .set('name', name)
        .set('ingredients', ingredients)
        .set('instructions', instructions)
        .where('id = :id')
        .bind('id', id)
        .execute(),
    );


module.exports = recipeEditModel;
