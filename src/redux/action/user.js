import { UserApi } from '../../utils/api';
import { openNotification } from '../../utils/helpers';

const Actions = {
  setUserData: (data) => ({
    type: 'USER:SET_DATA',
    payload: data,
  }),
  setIsAuth: (bool) => ({
    type: 'USER:SET_IS_AUTH',
    payload: bool,
  }),
  fetchUserData: () => (dispatch) => {
    UserApi.getMe()
      .then(({ data }) => {
        dispatch(Actions.setUserData(data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          dispatch(Actions.setIsAuth(false));
        }
        delete window.localStorage.token;
      });
  },
  fetchUserLogin: (postData) => (dispatch) => {
    return UserApi.login(postData).then(({ data }) => {
      const { status, token, message } = data;
      if (status === 'error') {
        openNotification({
          type: 'error',
          title: 'Error authentification',
          text: message,
        });
      } else {
        openNotification({
          type: 'success',
          title: 'Success authentification',
          text: 'Token has been remembered',
        });
        window.axios.defaults.headers.common['token'] = token;
        window.localStorage['token'] = token;

        dispatch(Actions.fetchUserData());
      }

      return status;
    });
  },
  fetchUserRegister: (postData) => (dispatch) => {
    return UserApi.register(postData).then(({ data }) => {
      const { status, message } = data;
      if (status === 'error') {
        openNotification({
          type: 'error',
          title: 'Error authentification',
          text: message,
        });
      } else {
        openNotification({
          type: 'success',
          title: 'Success authentification',
          text: 'Token has been remembered',
        });
      }
      return status;
    });
  },
};

export default Actions;
