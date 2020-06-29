import React from 'react';
import ClassNames from 'classnames';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Status = ({ online, fullname, lastSeen }) => (
  <div className='chat__dialog-header-center'>
    <b className='chat__dialog-header-username'>{fullname}</b>
    <div className='chat__dialog-header-status'>
      <span className={ClassNames('status', { 'status--online': online })}>
        {online
          ? 'Online'
          : `Offline ${formatDistanceToNow(parseISO(lastSeen))}`}
      </span>
    </div>
  </div>
);

export default Status;
