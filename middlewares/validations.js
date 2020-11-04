const passwordValidation = (req, res, next) => {
  const {
    password, verifyPassword,
  } = req.body;
  if (password.length < 6) return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  if (password !== verifyPassword) return res.status(400).json({ message: 'As senhas tem que ser iguais' });

  return next();
};

const regexValidation = (req, res, next) => {
  const {
    email, name, lastName,
  } = req.body;
  // Espressão regex consultada externamente (https://regex101.com/library/SOgUIV)
  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  const regexNumber = /[0-9]/;

  if (!regexEmail.test(email)) {
    return res.status(400)
      .json({ message: 'O email deve ter o formato email@mail.com' });
  }

  if (lastName.length < 3 || regexNumber.test(lastName)) {
    return res.status(400)
      .json({
        message:
        'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
  }

  if (regexNumber.test(name) || name.length < 3) {
    return res.status(400)
      .json({
        message:
        'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
      });
  }

  return next();
};

module.exports = {
  passwordValidation,
  regexValidation,
};
