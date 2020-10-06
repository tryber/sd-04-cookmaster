const connection = require('./connection');

// BUSCA TODAS AS RECEITAS -----------------------------------------------------
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

// PAGINA DA RECEITA PELO ID -----------------------------------------------------
const getRecipeById = async (idInput) =>
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

// BUSCA RECEITA -----------------------------------------------------
const searchRecipes = async (q) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'name', 'user'])
    .where('name like :q')
    .bind('q', `%${q}%`)
    .execute();

  const recipes = await results.fetchAll();
  const recipeList = await recipes.map(([id, name, user]) => ({ id, name, user }));

  return recipeList;
};

// CRIA RECEITA -----------------------------------------------------

module.exports = { findAll, getRecipeById, searchRecipes };
