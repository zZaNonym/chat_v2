import { combineReducers } from 'redux';

import dialogs from './dialogs';
import user from './user';
import messages from './messages';
import attachments from './attachments';
import tictactoe from './tictactoe';

export default combineReducers({
  dialogs,
  messages,
  user,
  attachments,
  tictactoe,
});
