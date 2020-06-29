import React from 'react';

import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Block } from '../../../components';
import { Link, Redirect } from 'react-router-dom';
import { validateField } from '../../../utils/helpers';

const RegisterForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    status,
  } = props;

  if (status) return <Redirect to='/register/verify' />;
  return (
    <div>
      <div className='auth__top'>
        <h2>Register your account</h2>
        <p>Please register your account</p>
      </div>
      <Block>
        <Form
          onSubmit={handleSubmit}
          name='normal_login'
          className='login-form'>
          <Form.Item
            name='email'
            hasFeedback
            validateStatus={validateField(touched.email, errors.email)}
            help={touched.email && errors.email ? errors.email : null}>
            <Input
              name='email'
              id='email'
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              size='large'
              prefix={<MailOutlined className='site-form-item-icon' />}
              placeholder='E-mail'
            />
          </Form.Item>
          <Form.Item
            help={touched.fullname && errors.fullname ? errors.fullname : null}
            name='fullname'
            hasFeedback
            validateStatus={validateField(touched.fullname, errors.fullname)}>
            <Input
              name='fullname'
              id='fullname'
              onBlur={handleBlur}
              value={values.fullname}
              onChange={handleChange}
              size='large'
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Fullname'
            />
          </Form.Item>
          <Form.Item
            help={touched.password && errors.password ? errors.password : null}
            hasFeedback
            validateStatus={validateField(touched.password, errors.password)}
            name='password'>
            <Input
              name='password'
              id='password'
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              size='large'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item
            help={
              touched.repeatPassword && errors.repeatPassword
                ? errors.repeatPassword
                : null
            }
            hasFeedback
            validateStatus={validateField(
              touched.repeatPassword,
              errors.repeatPassword
            )}
            name='repeatPassword'>
            <Input
              name='repeatPassword'
              id='repeatPassword'
              onBlur={handleBlur}
              value={values.repeatPassword}
              onChange={handleChange}
              size='large'
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              onClick={handleSubmit}
              size='large'
              disabled={isSubmitting}>
              Register
            </Button>
          </Form.Item>
          <Link to='/login' className='auth_register-link'>
            Log In
          </Link>
        </Form>
      </Block>
    </div>
  );
};

export default RegisterForm;
