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

const findByName = async (nameRecipe) => {
  /*
    .where('name like :filter')
    .bind('filter', `%${filter}%`)
  */
  const data = await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select()
        .where('name like :nameBind')
        .bind('nameBind', `%${nameRecipe}%`)
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

const add = (userId, user, recipeName, ingredients, instructions) => {
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, recipeName, ingredients, instructions)
      .execute(),
  );
};

module.exports = {
  getAll,
  findById,
  findByName,
  add,
};
