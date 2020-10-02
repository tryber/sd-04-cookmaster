const newUser = require('../models/userModel');

const cadastroForm = (req, res) => {
  res.render('cadastro', { message: null, redirect: null });
};

// const isEmpty = (req, res) => {
//   const { email, password, passconfirm, name, lastName } = req.body;

//   const con1 =
//     !email.includes('@') || !email.includes('.')
//       ? res.render('cadastro', {
//           message: 'O email deve ter o formato email@mail.com',
//         })
//       : null;
//   const con2 =
//     password.length < 6
//       ? res.render('cadastro', {
//           message: 'A senha deve ter pelo menos 6 caracteres',
//         })
//       : null;
//   const con3 =
//     password !== passconfirm
//       ? res.render('cadastro', {
//           message: 'As senhas tem que ser iguais',
//         })
//       : null;
//   const con4 =
//     typeof name !== 'string' || name.length <= 3
//       ? res.render('cadastro', {
//           message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
//         })
//       : null;
//   const con5 =
//     typeof lastName !== 'string' || lastName.length <= 3
//       ? res.render('cadastro', {
//           message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
//         })
//       : null;

//   if (con1 === null && con2 === null && con3 === null && con4 === null && con5 === null) {
//     newUser.createUser(email, password, name, lastName);
//     res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
//   }
// };

// const validateEmail = (req, res, next) => {
//   const { email } = req.body;
//   if (!email.includes('@') || !email.includes('.')) {
//     res.render('cadastro', {
//       message: 'O email deve ter o formato email@mail.com',
//     });
//     next();
//   }
//   create()

// };

// const validatePassword = (req, res, next) => {
//   const { password, passconfirm } = req.body;
//   if (password.length < 6) {
//     res.render('cadastro', {
//       message: 'A senha deve ter pelo menos 6 caracteres',
//     });
//     next()
//   }
//   if (password !== passconfirm) {
//     res.render('cadastro', {
//       message: 'As senhas tem que ser iguais',
//     });
//     next()
//   }
//   create()
// };

// const validateNome = (req, res, next) => {
//   const { name, lastName } = req.body;
//   if (typeof name !== 'string' || name.length <= 3) {
//     res.render('cadastro', {
//       message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
//     });
//     next();
//   }
//   if (typeof lastName !== 'string' || lastName.length <= 3) {
//     res.render('cadastro', {
//       message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
//     });
//     next();
//   }
//   create()
// };

// const create = (req, res) => {
//   const { email, password, name, lastName } = req.body;
//   newUser.createUser(email, password, name, lastName);
//   res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
// };

// const signup = async (req, res) => {
//   const { email, password, passconfirm, name, lastName } = req.body;
//   if (!email.includes('@') || !email.includes('.') ) {
//     res.render('cadastro', {
//       message: 'O email deve ter o formato email@mail.com',
//     });
//   }
//   if (password.length < 6) {
//     res.render('cadastro', {
//       message: 'A senha deve ter pelo menos 6 caracteres',
//     });
//   }
//   if (password !== passconfirm) {
//     res.render('cadastro', {
//       message: 'As senhas tem que ser iguais',
//     });
//   }
//   if (typeof name !== 'string' || name.length <= 3) {
//     res.render('cadastro', {
//       message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
//     });
//   }
//   if (typeof lastName !== 'string' || lastName.length <= 3) {
//     res.render('cadastro', {
//       message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
//     });
//   }
//   newUser.createUser(email, password, name, lastName);
//   res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
// };

module.exports = {
  cadastroForm,
};
