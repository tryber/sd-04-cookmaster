const regexNumber = /[0-9]/;

const validateName = (name) => name.length < 3 || regexNumber.test(name);

const validateLastName = (lastName) => lastName.length < 3 || regexNumber.test(lastName);

const validateEmail = (email) => email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

const messageReturn = {
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPassword: 'As senhas tem que ser iguais',
  name: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  lastName: 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
  confirmRegister: 'Cadastro efetuado com sucesso!',
};

const validateUsers = async (email, password, confirmEmail, name, lastName) => {
  switch (true) {
    case !validateEmail(email):
      return messageReturn.email;
    case password.length < 6:
      return messageReturn.password;
    case confirmEmail !== password:
      return messageReturn.confirmPassword;
    case validateName(name):
      return messageReturn.name;
    case validateLastName(lastName):
      return messageReturn.lastName;
    default:
      return messageReturn.confirmRegister;
  }
};

const validatedRegister = async (req, _res, next) => {
  const { email, password, confirmPassword, name, lastName } = req.body;

  req.message = await validateUsers(email, password, confirmPassword, name, lastName);

  if (req.message === messageReturn.confirmRegister) {
    req.validation = true;
    return next();
  }
  if (!req.validation) return next();
};

module.exports = { validatedRegister };
