const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select([]).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name]) => ({
        id,
        userId,
        user,
        name,
      })),
    );

const getByIdRecipe = async (id) => {
  try {
    const db = await connection();
    const results = await db
      .getTable('recipes')
      .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', id)
      .execute();
    const [userId, user, name, ingredients, instructions] = await results.fetchOne();
    return { id, userId, user, name, ingredients, instructions };
  } catch (error) {
    return error;
  }
};

const getRecipeByName = (qInput) =>
  connection()
    .then((bd) =>
      bd
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name'])
        .where('name like :q')
        .bind('q', `%${qInput}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, userId, user, name]) => ({
        id,
        userId,
        user,
        name,
      })),
    );

const createRecipe = async (id, user, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(id, user, name, ingredients, instructions)
      .execute(),
  );

const updateRecipeModel = async (id, name, ingredients, instructions) => {
  try {
    return connection().then((db) =>
      db
        .getTable('recipes')
        .update()
        .set('name', name)
        .set('ingredients', ingredients)
        .set('instructions', instructions)
        .where('id = :id_param')
        .bind('id_param', id)
        .execute(),
    );
  } catch (error) {
    return error;
  }
};

const deleteRecipeById = async (recipeId) => {
  try {
    const db = await connection();
    return db
      .getTable('recipes')
      .delete()
      .where('id = :recipeId')
      .bind('recipeId', recipeId)
      .execute();
  } catch (error) {
    return error;
  }
};

const getByUserIdRecipe = async (userID) => {
  try {
    const db = await connection();
    const results = await db
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name'])
      .where('user_id = :userId')
      .bind('userId', userID)
      .execute();
    const allByUsers = await results.fetchAll();
    return allByUsers.map(([id, userId, user, name]) => ({
      id,
      userId,
      user,
      name,
    }));
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRecipes,
  getByIdRecipe,
  getRecipeByName,
  createRecipe,
  updateRecipeModel,
  deleteRecipeById,
  getByUserIdRecipe,
};
