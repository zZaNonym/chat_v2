import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { Block } from '../../../components';
import { UserApi } from '../../../utils/api';

export default function CheckEmail({ location }) {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const hash = location.search.split('hash=')[1];
    if (hash) {
      UserApi.verifyHash(hash).then(({ data }) => {
        if (data.status === 'success') setVerified(true);
      });
    }
  });
  return (
    <Block>
      <div className='auth__succes-block'>
        <div>
          <InfoCircleTwoTone style={{ fontSize: '80px' }} />
        </div>
        {!verified ? (
          <>
            <h2>Confirm your account</h2>
            <p>A confirmation address has been sent to your e-mail</p>
          </>
        ) : (
          <>
            <h2>Success confirmation</h2>
            <p>Now you can sign in your account</p>
            <Button type='primary' className='auth_register-link'>
              <Link to='/login'>Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </Block>
  );
}
