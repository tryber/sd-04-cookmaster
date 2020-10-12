const connection = require('./connection');

const listCook = async () => {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id','user','name'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    // .then((resultado) => resultado.map(el=>el.resultado))
    .then((resul)=> resul.map(([id, user, name]) => ({ id, user, name})))
};

module.exports = {listCook};
