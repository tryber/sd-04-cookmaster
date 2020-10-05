/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (emaildig) => {
  const db = await connection();
  const userTable = await db.getTable('users')
    .select([])
    .where('email = :email')
    .bind('email', emaildig)
    .execute();
  const [id, email, password, name, lastName] = await userTable.fetchOne();
  return { id, name, lastName, email, password };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (Id) => {
  const db = await connection();
  const userTable = await db.getTable('users')
    .select([])
    .where('id = :id')
    .bind('id', Id)
    .execute();
  const [id, email, password, name, lastName] = await userTable.fetchOne();
  return { id, name, lastName, email, password };
};

const isValid = async (data) => {
  const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i ;
  const stringRegex = /[a-zA-Z\u00C0-\u00FF ]+/i;
  let message = [];
  switch (true) {
    case (!emailRegex.test(data.email)) :
      console.log('entrou EMAIL')
      return message.push('O email deve ter o formato email@mail.com');
    case (data.password < 6) :
      console.log('entrou SENHA')
      return message.push('A senha deve ter pelo menos 6 caracteres');
    case (data.confirmPassword !== data.password) :
      console.log('entrou CONFIRM')
      message.push('As senhas tem que ser iguais');
    case (!stringRegex.test(data.name) || data.name < 3) :
      console.log('entrou NAME')
      return message.push('O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
    case (!stringRegex.test(data.lastName) || data.lastName < 3) :
      console.log('entrou LAST NAME')
      return message.push('O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras');
    default:
      break;
  }

  return message;
}

const register = async ({ email, password, name, lastName}) => {
  const db = await connection();
  await db.getTable('users')
    .insert(['email', 'password', 'name', 'lastName'])
    .values(email, password, name, lastName)
    .execute()
}

module.exports = {
  findByEmail,
  findById,
  isValid,
  register,
};
