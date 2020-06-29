import React from 'react';
import PropTypes from 'prop-types';

import readed from '../../img/readed.svg';
import noreaded from '../../img/noreaded.svg';

const ReadedStatus = ({ isMe, isReaded }) =>
  isMe &&
  (isReaded ? (
    <img src={readed} alt='noreaded' className='message__noreadedImg' />
  ) : (
    <img src={noreaded} alt='readed' className='message__readedImg' />
  ));

export default ReadedStatus;

ReadedStatus.protTypes = {
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
};
