import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginForm, RegisterFrom } from '../../modules';
import CheckEmail from '../Auth/components/checkEmail';
import './Auth.scss';

const Auth = () => {
  return (
    <section className='auth'>
      <div className='auht__content'>
        <Switch>
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/register' component={RegisterFrom} />
          <Route exact path='/register/verify' component={CheckEmail} />
        </Switch>
      </div>
    </section>
  );
};

export default Auth;
