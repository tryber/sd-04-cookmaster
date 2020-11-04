const connection = require('./connection');

// Busca receitas do banco de dados e exibe na página inicial da aplicação
const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((resultados) => resultados.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

// Para página de busca de receitas
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

// Para ver a página detalhada de receita específica
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
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      userFromModel: user,
      name,
      ingredients,
      instructions,
    }));

// Para cadastrar nova receita no banco de dados
const createRecipeModel = async (userId, user, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .values(userId, user, name, ingredients, instructions)
        .execute(),
    );

// Exportando métodos para o Controller
module.exports = {
  findAll,
  searchRecipesModel,
  openRecipesModel,
  createRecipeModel,
};
