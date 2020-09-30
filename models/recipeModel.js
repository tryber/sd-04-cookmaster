const connection = require('./connection');

const getAll = async () => {
  const recipes = await connection()
    .then((schema) => {
      const table = schema.getTable('recipes');
      return table.select([]).execute();
    })
    .then((selectResult) => selectResult.fetchAll());
  const recipesObjs = recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));

  return recipesObjs;
};

module.exports = {
  getAll,
};
