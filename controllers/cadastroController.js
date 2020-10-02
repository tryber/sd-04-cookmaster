const newUser = require('../models/userModel');

const cadastroForm = (req, res) => {
  res.render('cadastro', { message: null, redirect: null });
};

// const validateEmail = (req, res, next) => {
//   const { email } = req.body;
//   if (!email.includes('@') || !email.includes('.')) {
//     res.render('cadastro', {
//       message: 'O email deve ter o formato email@mail.com',
//     });
//   }
//   next();
// };

// const validatePassword = (req, res, next) => {
//   const { password, passconfirm } = req.body;
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
//   next();
// };

// const validateNome = (req, res, next) => {
//   const { name, lastName } = req.body;
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
//   next();
// };

// const create = (req, res) => {
//   const { email, password, name, lastName } = req.body;
//   newUser.createUser(email, password, name, lastName);
//   res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
// };

const signup = (req, res) => {
  const { email, password, passconfirm, name, lastName } = req.body;
  !email.includes('@') || !email.includes('.')
    ? res.render('cadastro', {
        message: 'O email deve ter o formato email@mail.com',
      })
    : password.length < 6
    ? res.render('cadastro', {
        message: 'A senha deve ter pelo menos 6 caracteres',
      })
    : password !== passconfirm
    ? res.render('cadastro', {
        message: 'As senhas tem que ser iguais',
      })
    : typeof name !== 'string' || name.length <= 3
    ? res.render('cadastro', {
        message: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      })
    : typeof lastName !== 'string' || lastName.length <= 3
    ? res.render('cadastro', {
        message: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      })
    : newUser.createUser(email, password, name, lastName);
  res.render('cadastro', { message: 'Cadastro efetuado com sucesso!' });
};

module.exports = {
  cadastroForm,
  signup,
};
