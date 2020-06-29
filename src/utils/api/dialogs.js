import { axios } from '../../core';

export default {
  getAll: () => axios.get('/dialogs'),
  create: (parterId, text) =>
    axios.post('/dialogs', { partner: parterId, text }),
  remove: (id) => axios.delete('/dialogs?id=' + id),
};
