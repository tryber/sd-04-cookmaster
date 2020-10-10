const connection = require('./connection');

const getRecipes = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipeData) =>
      recipeData.map(([id, user, name, ingredients, instructions]) => ({
        id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const find = async (idUser) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', idUser)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipesById) =>
      recipesById.reduce(({ id, name, ingredients, instructions }) => ({
        id,
        name,
        ingredients,
        instructions,
      })),
    );

const getRecipesByName = async (q) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .orderBy(['name'])
        .bind('name', `%${q}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipeData) =>
      recipeData.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const isValid = (nameRecipe, task, instrucoes) => nameRecipe && task && instrucoes;

const createRecipe = async (userId, userName, nameRecipe, task, instrucoes) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values([userId, userName, nameRecipe, task, instrucoes])
      .execute(),
  );

// fazer update do banco
const updateRecipe = async (recipeId, name, ingredients, instructions) => {
  const db = await connection();
  await db
    .getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
};

const deleteRecipeModel = async (id) => {
  const db = await connection();
  await db.getTable('recipes').delete().where('id = :id').bind('id', id).execute();
};

module.exports = {
  getRecipes,
  find,
  getRecipesByName,
  createRecipe,
  isValid,
  updateRecipe,
  deleteRecipeModel,
};
