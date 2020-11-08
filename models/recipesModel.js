const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((dataBase) => dataBase.getTable('recipes').select().execute())
    .then((results) => results.fetchAll())
    .then((data) =>
      data.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = getAllRecipes;
