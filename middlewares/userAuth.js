const nameIsValid = (firstName, lastName) => {
  const regNum = /[0-9]/;
  const msg = '';

  if (!firstName || firstName.length < 3 || regNum.test(firstName))
    return 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';

  if (!lastName || lastName.length < 3 || regNum.test(lastName))
    return 'O segundo nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras';

  return msg;
};

const emailIsValid = (email) => {
  const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const msg = '';
  if (!email || !regEmail.test(email)) return 'O email deve ter o formato email@mail.com';
  return msg;
};

const passwValid = (password, confirm) => {
  const msg = '';

  if (password !== confirm) return 'As senhas tem que ser iguais';

  if (!password || password.length < 6) return 'A senha deve ter pelo menos 6 caracteres';

  return msg;
};

const validation = (req, res, next) => {
  const { firstName, lastName, email, password, confirm } = req.body;
  const theName = nameIsValid(firstName, lastName);
  const theEmail = emailIsValid(email);
  const thePassword = passwValid(password, confirm);

  if (theName !== '') {
    res.render('register', { msg: theName });
  }

  if (theEmail !== '') {
    res.render('register', { msg: theEmail });
  }

  if (thePassword !== '') {
    res.render('register', { msg: thePassword });
  }

  return next();
};

module.exports = { validation };
