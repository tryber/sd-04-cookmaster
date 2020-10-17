const connection = require('./connection');

const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userEmail, password, name, lastName]) => ({
      id,
      userEmail,
      password,
      name,
      lastName,
    }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */

const findById = async (id) => {
  return connection()
    .then((db) =>
      db.getTable('users').select([]).where('id = :id_param').bind('id_param', id).execute(),
    )
    .then((results) => results.fetchOne())
    .then(([userId, email, password, name, lastName]) => ({
      userId,
      email,
      password,
      name,
      lastName,
    }));
};

const createUser = async (email, password, nome, sobrenome) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, nome, sobrenome)
      .execute(),
  );
};

const nameIsValid = (nome, sobrenome) => {
  const numberInStringRegex = /[0-9]/;

  if (numberInStringRegex.test(nome) || nome.length < 3) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  if (numberInStringRegex.test(sobrenome) || sobrenome.length < 3) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }

  return 'ok';
};

const userIsValid = (forms) => {
  const { email, password, confirmPassword, nome, sobrenome } = forms;

  const emailRegex = (validate) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(validate);
  if (!emailRegex(email)) {
    return 'O email deve ter o formato email@mail.com';
  }

  if (password.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  if (password !== confirmPassword) {
    return 'As senhas tem que ser iguais';
  }

  return nameIsValid(nome, sobrenome);
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  userIsValid,
};
