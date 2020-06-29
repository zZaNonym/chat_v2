import { DialogsApi } from '../../utils/api';
import socket from '../../core/socket';
import { openNotification } from '../../utils/helpers';

const actions = {
  setDialogs: (items) => ({
    type: 'DIALOGS:SET_ITEMS',
    payload: items,
  }),
  fetchDialogs: () => (dispatch) => {
    DialogsApi.getAll().then(({ data }) => {
      dispatch(actions.setDialogs(data));
    });
  },
  fetchRemoveDialog: (id) => (dispatch) => {
    DialogsApi.remove(id).then(({ data }) => {
      openNotification({
        type: data.status,
        title: 'Admin',
        text: data.message,
      });
    });
    actions.setCurrentDialog('');
  },
  setCurrentDialog: (id) => (dispatch) => {
    socket.emit('DIALOGS:JOIN', id);
    dispatch({
      type: 'DIALOGS:SET_CURRENT_DIALOG',
      payload: id,
    });
  },
};

export default actions;
