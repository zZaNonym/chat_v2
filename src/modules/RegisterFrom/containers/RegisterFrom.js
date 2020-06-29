import { withFormik } from 'formik';
import RegisterFrom from '../components/RegisterFrom';

import validate from '../../../utils/validate';
import { userActions } from '../../../redux/action';
import store from '../../../redux/store';

export default withFormik({
  mapPropsToValues: () => ({
    password: '',
    fullname: '',
    email: '',
    repeatPassword: '',
  }),
  validate: (values) => {
    let errors = {};

    validate['register'](errors, values);

    return errors;
  },

  handleSubmit: (values, { setSubmitting, setErrors, setStatus }) => {
    store.dispatch(userActions.fetchUserRegister(values)).then((status) => {
      status === 'error' && setErrors({ email: ' ' });
      if (status === 'success') setStatus(true);
      setSubmitting(false);
    });
  },

  displayName: 'RegisterFrom',
})(RegisterFrom);
