const connection = require('./connection');

const findAllRecipes = () => {
  return connection()
    .then((db) => db.getTable('recipes').select([]).execute())
    .then((results) => results.fetchAll())
    .then((results) =>
      results.map(([id, user_id, user, name, ingredients, instructions]) => ({
        id,
        user_id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );
};

module.exports = {
  findAllRecipes,
}