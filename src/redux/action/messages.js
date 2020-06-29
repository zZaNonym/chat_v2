import { MessagesApi } from '../../utils/api';
import { openNotification } from '../../utils/helpers';

const actions = {
  setMessages: (items) => ({
    type: 'MESSAGES:SET_ITEMS',
    payload: items,
  }),
  addMessages: (message) => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialog } = dialogs;

    if (currentDialog === message.dialog._id) {
      dispatch({
        type: 'MESSAGES:ADD_MESSAGE',
        payload: message,
      });
    }
  },
  removeById: (id) => ({
    type: 'MESSAGES:REMOVE_ITEM',
    payload: id,
  }),
  setIsLoading: (bool) => ({
    type: 'MESSAGES:SET_IS_LOADING',
    payload: bool,
  }),
  setIsTyping: (bool) => ({
    type: 'MESSAGES:SET_IS_TYPING',
    payload: bool,
  }),
  fetchRemoveById: (id) => (dispatch) => {
    MessagesApi.removeById(id).then((res) => {
      if (res.data.status === 'success') {
        dispatch(actions.removeById(id));
        openNotification({
          type: 'success',
          title: 'Admin',
          text: res.data.message,
        });
      }
    });
  },
  fetchMessages: (dialogId) => (dispatch) => {
    dispatch(actions.setIsLoading(true));
    MessagesApi.getByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(actions.setMessages(data));
      })
      .catch(() => {
        dispatch(actions.setIsLoading(false));
      });
  },
  sendMessages: ({ text, dialogId, attachments }) => (dispatch) =>
    MessagesApi.send(text, dialogId, attachments),
};

export default actions;
