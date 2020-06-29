import { axios } from '../../core';

export default {
  getByDialogId: (id) => axios.get('/messages?_id=' + id),
  send: (text, dialogId, attachments) => {
    axios.post('/messages', {
      text: text,
      dialogId: dialogId,
      attachments,
    });
  },
  removeById: (id) => axios.delete('/messages?id=' + id),
};
