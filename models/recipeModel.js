const connection = require('./connection');

// implementar o método para consultar o BD
const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const recipeById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([recipeId, userId, user, name, ingredients, instructions]) => ({
      recipeId,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

const searchRecipes = async (search) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${search}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

// encontrar as receitas do UserLogado (minhas receitas)
const myRecipeByUserId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([recipeId, user, name]) => ({
        id: recipeId,
        user,
        name,
      })),
    );

// const addNewRecipe = async (userId, user, name, ingredients, instructions) =>
//   connection().then((db) =>
//     db
//       .getTable('recipes')
//       .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
//       .values(userId, user, name, ingredients, instructions)
//       .execute(),
// );
// métodos exportados para o controller

const deleteRecipe = async (id) =>
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', id).execute(),
  );

module.exports = {
  findAll,
  recipeById,
  searchRecipes,
  myRecipeByUserId,
  deleteRecipe,
  // addNewRecipe,
};
