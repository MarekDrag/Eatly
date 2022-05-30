import axios from "../axios";

async function validateRegister(values){
    const errors = {};
    let checkUser = { name: false, email: false };
    await axios.get("/api/users").then((res) => {
      let response = res.data;
      for (const key in response) {
        if (values.email === response[key].email) {
          checkUser.email = true;
        }
        if (values.name === response[key].name) {
          checkUser.name = true;
        }
      }
    });
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) {
      errors.email = "Email jest wymagany";
    } else if (!regex.test(values.email)) {
      errors.email = "Email jest nieprawidłowy";
    } else if (checkUser.email) {
      errors.email = `${values.email} już istnieje`;
    }
    if (!values.name) {
      errors.name = "Nazwa użytkownika jest wymagana";
    } else if (checkUser.name) {
      errors.name = `${values.name} już istnieje`;
    }
    if (!values.password) {
      errors.password = "Hasło jest wymagane";
    } else if (values.password.length < 8) {
      errors.password = "Hasło musi mieć min. 8 znaków";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Musisz potwierdzić hasło";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Hasła nie są takie same";
    }
    return errors;
  };

export default validateRegister;