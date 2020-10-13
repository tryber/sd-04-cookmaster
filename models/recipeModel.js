const connection = require('./connection');

const receitaById = async (id) => {
  const idData = await connection()
    .then((db) => db.getTable('recipes').select([]).where('id = :id').bind('id', id).execute())
    .then((results) => results.fetchAll());

  const receita = {};
  [
    receita.id,
    receita.user_id,
    receita.user,
    receita.name,
    receita.ingredients,
    receita.instructions,
  ] = idData[0];
  return receita;
};

module.exports = {
  receitaById,
};
