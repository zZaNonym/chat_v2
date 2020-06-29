import React from 'react';

import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Block } from '../../../components';
import { Link } from 'react-router-dom';
import { validateField } from '../../../utils/helpers';

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div>
      <div className='auth__top'>
        <h2>Join to the account</h2>
        <p>Please enter in your account</p>
      </div>
      <Block>
        <Form
          name='normal_login'
          className='login-form'
          onSubmit={handleSubmit}>
          <Form.Item
            name='email'
            hasFeedback
            validateStatus={validateField(touched.email, errors.email)}
            help={touched.email && errors.email ? errors.email : null}>
            <Input
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              id='email'
              name='email'
              size='large'
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            hasFeedback
            validateStatus={validateField(touched.password, errors.password)}
            help={touched.password && errors.password ? errors.password : null}>
            <Input
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              id='password'
              name='password'
              size='large'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              size='large'
              onClick={handleSubmit}
              disabled={isSubmitting}>
              Log in
            </Button>
          </Form.Item>
          <Link to='/register' className='auth_register-link'>
            Register
          </Link>
        </Form>
      </Block>
    </div>
  );
};

export default LoginForm;
