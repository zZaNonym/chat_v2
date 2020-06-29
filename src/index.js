import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { userActions } from './redux/action';
import './styles/index.scss';
import 'emoji-mart/css/emoji-mart.css';

import store from './redux/store';
if (store.getState().user.data === null) {
  store.dispatch(userActions.fetchUserData());
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>{' '}
  </Provider>,
  document.getElementById('root')
);
