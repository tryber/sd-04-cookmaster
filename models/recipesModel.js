const connection = require('./connection');

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const dbSelect = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
    const results = await dbSelect.fetchAll();
    return results.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error;
  }
};

const recipeDetails = async (idInp) => {
  try {
    const db = await connection();
    const dbSelectId = await db
      .getTable('recipes')
      .select(['id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :idInp')
      .bind('idInp', idInp)
      .execute();
    const [id, user, name, ingredients, instructions] = await dbSelectId.fetchOne();
    return {
      id,
      user,
      name,
      ingredients,
      instructions,
    };
  } catch (error) {
    return error;
  }
};

const recipeSearchByName = async (nameInp) => {
  try {
    const db = await connection();
    const dbSearchByName = await db
      .getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name LIKE :nameInp')
      .bind('nameInp', `%${nameInp}%`)
      .execute();
    const results = await dbSearchByName.fetchAll();
    return results.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error;
  }
};

const createRecipeModel = async (id, user, name, ingredients, instructions) => {
  try {
    const db = await connection();
    const createRecipe = await db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(id, user, name, ingredients, instructions)
      .execute();

    return createRecipe;
  } catch (error) {
    return error;
  }
};

const editRecipeModel = async (id, name, ingredients, instructions) => {
  try {
    const db = await connection('cookmaster');
    return await db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :id')
      .bind('id', id)
      .execute();
  } catch (error) {
    return error;
  }
};

const recipeDetailsByID = async (idInp) => {
  try {
    const db = await connection();
    const dbSelectId = await db
      .getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :idInp')
      .bind('idInp', idInp)
      .execute();
    const [id, userId, email, name, ingredients, instructions] = await dbSelectId.fetchOne();
    return {
      id,
      userId,
      email,
      name,
      ingredients,
      instructions,
    };
  } catch (error) {
    return error;
  }
};

//  Model para devolver receitas do usuario logado, ao clicar em 'Minhas Receitas'.
const selectRecipeByUserId = async (idInp) => {
  try {
    const db = await connection();
    const dbSelectId = await db
      .getTable('recipes')
      .select(['id', 'user', 'name', 'user_id'])
      .where('user_id = :idInp')
      .bind('idInp', idInp)
      .execute();
    const result = await dbSelectId.fetchAll();
    return result.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error;
  }
};

//  Deletar receita no banco.
const deleteRecipeModel = async (id) => {
  try {
    const db = await connection();
    return await db.getTable('recipes').delete().where('id = :id').bind('id', id).execute();
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRecipes,
  recipeDetails,
  recipeSearchByName,
  createRecipeModel,
  editRecipeModel,
  recipeDetailsByID,
  selectRecipeByUserId,
  deleteRecipeModel,
};
