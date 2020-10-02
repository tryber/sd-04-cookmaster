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

const getById = async (ID) =>
  connection()
    .then((schema) => {
      const table = schema.getTable('recipes');
      return table.select([]).where('id = :ID').bind({ ID }).execute();
    })
    .then((selectResult) => selectResult.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => {
      return {
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      };
    });

const getAllByUser = async (ID) =>
  connection()
    .then((schema) => {
      const table = schema.getTable('recipes');
      return table.select([]).where('user_id = :ID').bind({ ID }).execute();
    })
    .then((selectResult) => selectResult.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = {
  getAll,
  getById,
  getAllByUser,
};
