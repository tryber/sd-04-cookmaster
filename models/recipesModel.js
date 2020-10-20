const connection = require('./connection');

const getRecipes = async () =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select([])
      .execute()
      .then((res) => res.fetchAll())
      .then((result) =>
        result.map(([id, userID, user, name, ingredients, instructions]) => ({
          id,
          userID,
          user,
          name,
          ingredients,
          instructions,
        })),
      )
  )
  .catch((err) => {
    throw err
  });

const findById = async (id) => {
  return connection()
  .then((db) =>
    db.getTable('recipes').select([]).where('id = :id').bind('id', id)
      .execute()
      .then((results) => results.fetchAll()[0])
      .then(([id, userId, user, name, ingredients, instructions]) => ({
        id, userId, user, name, ingredients, instructions
      }))
  )
  .catch((err) => { throw err });
};

const findByName = async (name) => {
  return connection()
  .then((db) =>
    db.getTable('recipes').select([]).where('name LIKE :name').bind('name', `%${name}%`)
      .execute()
      .then((results) => results.fetchAll())
      .then((recipes) => recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id, userId, user, name, ingredients, instructions
      })))
  )
  .catch((err) => { throw err });
};

module.exports = { getRecipes, findById, findByName };
