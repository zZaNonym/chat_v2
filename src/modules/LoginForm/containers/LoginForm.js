import { withFormik } from 'formik';
import store from '../../../redux/store';
import LoginForm from '../components/LoginForm';
import validate from '../../../utils/validate';
import { userActions } from '../../../redux/action';

const LoginFromContainer = withFormik({
  mapPropsToValues: () => ({
    password: '',
    email: '',
  }),
  validate: (values) => {
    let errors = {};

    validate['login'](errors, values, false);

    return errors;
  },

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    store.dispatch(userActions.fetchUserLogin(values)).then((status) => {
      status === 'error' && setErrors({ email: ' ', password: ' ' });
      setSubmitting(false);
    });
  },

  displayName: 'LoginForm',
})(LoginForm);

export default LoginFromContainer;
