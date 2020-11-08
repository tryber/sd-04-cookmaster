const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((resultados) => resultados.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const searchRecipesModel = async (search) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${search}%`)
        .execute(),
    )
    .then((resultados) => resultados.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const openRecipesModel = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((resultados) => (resultados).fetchAll()[0])
    .then(([recipeId, userId, user, name, ingredients, instructions]) => ({
      id: recipeId,
      userId,
      userFromModel: user,
      name,
      ingredients,
      instructions,
    }));

const createRecipeModel = async (userId, user, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .values(userId, user, name, ingredients, instructions)
        .execute(),
    );

const editRecipeModel = async (id, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .update()
        .set('name', name)
        .set('ingredients', ingredients)
        .set('instructions', instructions)
        .where('id = :id')
        .bind('id', id)
        .execute(),
    );


const getRecipeByUser = async (idDoUser) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name'])
        .where('user_id = :user_id')
        .bind('user_id', idDoUser)
        .execute(),
    )
    .then((resultados) => resultados.fetchAll())
    .then((recipes) => recipes.map(([id, userId, user, name]) => ({
      id,
      userId,
      user,
      name,
    })));

const deleteRecipe = async (id) => {
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    );
};

module.exports = {
  findAll,
  searchRecipesModel,
  openRecipesModel,
  createRecipeModel,
  editRecipeModel,
  getRecipeByUser,
  deleteRecipe,
};
