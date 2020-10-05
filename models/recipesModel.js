const connection = require('./connection');

const findAll = async () =>
  connection()
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

const getRecipeById = async (idInput) =>
  // const db = await connection();
  // const table = await db.getTable('recipes');
  // const result = await table.select().where('id = :idInput').bind('idInput', idInput).execute();
  // const [id, userId, user, name, ingredients, instructions] = await result.fetchAll()[0];
  // return { id, userId, user, name, ingredients, instructions };
  // };
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idInput')
        .bind('idInput', idInput)
        .execute(),
    )
    .then((results) => results.fetchAll()[0])
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

module.exports = { findAll, getRecipeById };
