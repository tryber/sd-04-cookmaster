const connection = require('./connection');

// BUSCA TODAS AS RECEITAS -----------------------------------------------------
const allRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
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

// PAGINA DA RECEITA PELO ID -----------------------------------------------------
const getRecipeById = async (idInput) =>
  connection()
    .then((db) => db.getTable('recipes').select().where('id = :idInput').bind('idInput', idInput)
    .execute())
    .then((results) => results.fetchAll()[0])
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

// BUSCA RECEITA -----------------------------------------------------

const searchRecipes = async (q) =>
  connection()
    .then((db) =>
      db.getTable('recipes').select().where('name like :q').bind('q', `%${q}%`)
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

// DELETA RECEITA -----------------------------------------------------

const deleteRecipe = (id) => 
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', id)
    .execute(),
  );

// // MINHAS RECEITAS ----------------------------------------------------
const getAllByUserId = async (userId) =>
  connection()
    .then((db) =>
      db.getTable('recipes').select().where('user_id = :userId').bind('userId', userId)
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

module.exports = {
  allRecipes,
  getRecipeById,
  searchRecipes,
  deleteRecipe,
  getAllByUserId,
};
