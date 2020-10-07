const connection = require('./connection');

const meEditModel = (id, email, password, firstName, lastName) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .update()
        .set('email', email)
        .set('password', password)
        .set('first_name', firstName)
        .set('last_name', lastName)
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then(() =>
      connection()
        .then((db) =>
          db
            .getTable('recipes')
            .update()
            .set('user', `${firstName} ${lastName}`)
            .where('user_id = :id')
            .bind('id', id)
            .execute(),
        )
    );

module.exports = meEditModel;
