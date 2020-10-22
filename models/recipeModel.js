const connection = require('./connection');

async function getAllRecipes() {
  const dbcookmaster = await connection();
  const result = await dbcookmaster.getTable('recipes').select(['id', 'user', 'name']).execute();
  const data = await result.fetchAll();

  return data.map(([id, user, name]) => ({ id, user, name }));
}

async function getRecipe(recipeId) {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', recipeId)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, idUser, user, name, ingredients, instructions]) => ({
      id,
      idUser,
      user,
      name,
      ingredients,
      instructions,
    }));
}

async function getRecipeByName(q) {
  return connection()
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
    .then((data) =>
      data.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );
}

const verifyData = (recipeName, ingredients, prepare) => recipeName && ingredients && prepare;

async function createRecipe(userId, userName, recipeName, ingredients, prepare) {
  // console.log(userId, userName, recipeName, ingredients, prepare);
  return connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values([userId, userName, recipeName, ingredients, prepare])
      .execute(),
  );
}

const updateRecipe = async (id, recipeName, ingredients, prepare) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', recipeName)
      .set('ingredients', ingredients)
      .set('instructions', prepare)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );

async function confirmRemove(id) {
  return connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', id)
    .execute(),
  );
}

module.exports = {
  getAllRecipes,
  getRecipe,
  getRecipeByName,
  verifyData,
  createRecipe,
  confirmRemove,
  updateRecipe,
};
