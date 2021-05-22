module.exports.validationRegister = (
  username,
  email,
  password,
  confirmPassword
) => {
  errors = {};
  if (username.trim() === "") {
    errors.username = "Musisz podać login!";
  }
  if (email.trim() === "") {
    errors.email = "Musisz podać email!";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Podałeś błędny adres email";
    }
  }
  if (password === "") {
    errors.password = "Musisz podać hasło!";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Hasła muszą być identyczne!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
