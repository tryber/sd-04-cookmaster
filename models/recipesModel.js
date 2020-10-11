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
    .then((db) =>
      db.getTable('recipes').select().where('id = :idInput').bind('idInput', idInput).execute(),
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

const searchRecipes = async (q) =>
  connection()
    .then((db) =>
      db.getTable('recipes').select().where('name like :q').bind('q', `%${q}%`).execute(),
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

const deleteRecipe = async (id) =>
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', id).execute(),
  );

// MINHAS RECEITAS ----------------------------------------------------

const getAllByUserId = async (userIdInput) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select()
        .where('user_id = :userIdInput')
        .bind('userIdInput', userIdInput)
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

// CRIAR RECEITA ---------------------------------------------------------

const createRecipe = (userId, user, name, ingredients, instructions) => {
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
  );
};

module.exports = {
  allRecipes,
  getRecipeById,
  searchRecipes,
  deleteRecipe,
  getAllByUserId,
  createRecipe,
};
