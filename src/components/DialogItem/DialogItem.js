import React from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

import { Emoji } from 'emoji-mart';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import isToday from 'date-fns/isToday';

import './DialogItem.scss';
import ReadedStatus from '../ReadedStatus/ReadedStatus';
import Avatar from '../Avatar/Avatar';

const getFormatData = (createdAt) => {
  if (isToday(parseISO(createdAt))) {
    return format(parseISO(createdAt), 'HH:mm');
  } else {
    return format(parseISO(createdAt), 'dd.MM.yyyy');
  }
};

const DialogItem = ({
  _id,
  userId,
  lastMessage,
  partner,
  author,
  currentDialog,
  unReaded,
}) => {
  let partnerObj;
  if (author._id === userId) {
    partnerObj = partner;
  } else {
    partnerObj = author;
  }
  return (
    <Link to={`/dialog/${_id}`}>
      <div
        className={ClassNames('dialogs__item', {
          'dialogs__item--online': partnerObj.isOnline,
          'dialogs__item--selected': currentDialog === _id,
        })}>
        <div className='dialogs__item-avatar'>
          <Avatar
            avatar={partnerObj.avatar}
            _id={_id}
            fullname={partnerObj.fullname}
          />
        </div>
        <div className='dialogs__item-info'>
          <div className='dialogs__item-info-top'>
            <b>{partnerObj.fullname}</b>
            <span>{lastMessage && getFormatData(lastMessage.createdAt)}</span>
          </div>
          <div className='dialogs__item-info-bottom'>
            {lastMessage &&
              (lastMessage.attachments.length ? (
                <p>File</p>
              ) : (
                <p>
                  {reactStringReplace(
                    lastMessage.text,
                    /:(.+?):/g,
                    (match, i) => (
                      <Emoji key={i} emoji={match} set='apple' size={16} />
                    )
                  )}
                </p>
              ))}
            {lastMessage && (
              <>
                {unReaded > 0 && (
                  <span className='dialogs__item-info-bottom-count'>
                    {unReaded < 10 ? unReaded : '9+'}
                  </span>
                )}

                <ReadedStatus
                  isMe={userId === lastMessage.user}
                  isReaded={lastMessage && lastMessage.read}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DialogItem;
