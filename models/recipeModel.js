const connection = require('./connection');

const getAll = async () => {
  const data = await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
    .then((results) => results.fetchAll())
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
  return data;
};

const findById = async (idRecipe) => {
  const data = await connection()
    .then((db) =>
      db.getTable('recipes').select().where('id = :idBind').bind('idBind', idRecipe).execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));
  return data;
};

module.exports = {
  getAll,
  findById,
};
