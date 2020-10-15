const connection = require('./connection');

const updateRecipe = async (id, receita, ingredientes, preparo) => {
  const ingre = ingredientes.toString();
  return connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', receita)
      .set('ingredients', ingre)
      .set('instructions', preparo)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );
};

module.exports = {
  updateRecipe,
};
