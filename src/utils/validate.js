export default {
  register: (errors, values) => {
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i.test(values.password)
    ) {
      errors.password = 'Too easy password';
    }
    if (!values.fullname) {
      errors.fullname = 'Required';
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = 'Required';
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'Wrong repeated password';
    }
  },
  login: (errors, values, isAuth) => {
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
  },
};
