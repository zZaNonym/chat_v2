import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth, Home } from './pages';

function App({ isAuth }) {
  if (isAuth === null) {
    return null;
  }
  return (
    <div className='wrapper'>
      <Switch>
        <Route
          exact
          path={['/login', '/register', '/register/verify']}
          render={() => (isAuth ? <Redirect to='/' /> : <Auth />)}
        />
        <Route
          path={['/', '/dialog/:id']}
          render={() => (isAuth ? <Home /> : <Redirect to='/login' />)}
        />
      </Switch>
    </div>
  );
}

export default connect(({ user }) => ({
  isAuth: user.isAuth,
}))(App);
