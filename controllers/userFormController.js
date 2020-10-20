const userModel = require('../models/userModel');

const validateName = (name) => {
  if (!userModel.isUserNameValid(name)) {
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};

const validateLastName = (lastName) => {
  if (!userModel.isUserLastNameValid(lastName)) {
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';
  }
  return null;
};

const validadeEmail = (email) => {
  if (!userModel.isEmailValid(email)) {
    return 'O email deve ter o formato email@mail.com';
  }
  return null;
};

const validatePassword = (password) => {
  if (!userModel.isPasswordValid(password)) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  return null;
};

const validateConfirmPassword = (password, cPassword) => {
  if (!userModel.isCounterPasswordValid(password, cPassword)) {
    return 'As senhas tem que ser iguais';
  }
  return null;
};

const userForm = async (_req, res) => {
  res.status(200).render('cadastro', {
    isName: null,
    isLastName: null,
    isEmail: null,
    isPassword: null,
    isConfirmPassword: null,
    success: null,
  });
};

const newUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const isName = validateName(firstName);
  const isLastName = validateLastName(lastName);
  const isEmail = validadeEmail(email);
  const isPassword = validatePassword(password);
  const isConfirmPassword = validateConfirmPassword(password, confirmPassword);
  if (isName || isLastName || isEmail || isPassword || isConfirmPassword) {
    res.render('cadastro', {
      isName,
      isLastName,
      isEmail,
      isPassword,
      isConfirmPassword,
      success: null,
    });
  }
  await userModel.createUser(email, firstName, lastName, password);
  return res.render('cadastro', {
    isName,
    isLastName,
    isEmail,
    isPassword,
    isConfirmPassword,
    success: 'Cadastro efetuado com sucesso!',
  });
};

const renderEditUser = async (req, res) => {
  const id = req.user.iD;
  const isUser = await userModel.findById(id);

  // console.log('linha 81, req.body: ', req.body);

  res.status(200).render('editUser', {
    user: isUser,
    isName: null,
    isLastName: null,
    isEmail: null,
    isPassword: null,
    isConfirmPassword: null,
  });
};

const editUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await userModel.findById(req.user.iD);

  // console.log('linha 97, user: ', user);

  // const isName = validateName(firstName);
  // const isLastName = validateLastName(lastName);
  // const isEmail = validadeEmail(email);
  // const isPassword = validatePassword(password);
  // const isConfirmPassword = validateConfirmPassword(password, confirmPassword);
  // if (isName || isLastName || isEmail || isPassword || isConfirmPassword) {
  //   res.render('editUser', {
  //     user,
  //     isName,
  //     isLastName,
  //     isEmail,
  //     isPassword,
  //     isConfirmPassword,
  //     success: null,
  //   });
  // }

  await userModel.updateUser(user.iD, email, firstName, lastName, password);
  res.redirect('/');
};

module.exports = {
  newUser,
  userForm,
  renderEditUser,
  editUser,
};
