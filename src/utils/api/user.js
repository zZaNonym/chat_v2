import { axios } from '../../core';

export default {
  login: (postData) => axios.post('/user/login', postData),
  getMe: () => axios.get('/user/me'),
  register: (postData) => axios.post('/user/register', postData),
  verifyHash: (hash) => axios.post('/user/verify?hash=' + hash),
  findUsers: (query) => axios.get('/user/find?query=' + query),
};
