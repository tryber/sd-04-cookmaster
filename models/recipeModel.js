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
      db.getTable('recipes').select().where('id = :idBind').bind('idBind', idRecipe)
      .execute(),
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

// receitas por usuario
const findByUserId = async (idUser) => {
  const data = await connection()
    .then((db) =>
      db.getTable('recipes').select().where('user_id = :idBind').bind('idBind', idUser)
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

const update = async (idRecipe, recipeName, ingredients, instructions) => {
  const data = await connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', recipeName)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :idBind')
      .bind('idBind', idRecipe)
      .execute(),
  );
  return data;
};

// exclusão de receita ou delete
// .where('id = :idBind', 'user_id = :userIdBind')
// .bind('idBind', idRecipe, 'userIdBind', userId)
const remove = async (idRecipe) => {
  const data = await connection().then((db) =>
    db
      .getTable('recipes')
      .delete()
      .where('id = :idBind')
      .bind('idBind', idRecipe)
      .execute(),
  );
  return data;
};

module.exports = {
  getAll,
  findById,
  findByName,
  findByUserId,
  add,
  update,
  remove,
};
