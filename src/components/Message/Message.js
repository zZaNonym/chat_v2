import React from 'react';
import ClassNames from 'classnames';
import { Popover, Button } from 'antd';
import PropTypes from 'prop-types';

import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { Emoji } from 'emoji-mart';
import reactStringReplace from 'react-string-replace';

import './Message.scss';
import Time from '../Time/Time';
import ReadedStatus from '../ReadedStatus/ReadedStatus';
import Avatar from '../Avatar/Avatar';

import AudioElem from './AudioElem/AudioElem';

const Message = ({
  text,
  user,
  isMe,
  read,
  createdAt,
  attachments,
  isTyping,
  onRemoveMessage,
  setPreviewImage,
}) => {
  const idAudio = () => {
    if (attachments.length === 1 && attachments[0].ext === 'webm') return true;
    return false;
  };
  const renderAttachment = (item) => {
    return (
      <div
        key={item._id}
        onClick={() => setPreviewImage(item.url)}
        className='message__attachements-item'>
        <img src={item.url} alt={item.filename} />
      </div>
    );
  };
  return (
    <div
      className={ClassNames('message', {
        'message--isme': isMe,
        'message--is-typing': isTyping,
        'message--image': attachments.length === 1,
        'message--is-audio': idAudio(attachments),
      })}>
      <div className='message__avatar'>
        <Avatar avatar={user.avatar} _id={user._id} fullname={user.fullname} />
      </div>
      <div className='message__content'>
        {!isTyping && <ReadedStatus isMe={isMe} isReaded={read} />}
        {isMe && (
          <div className='message_icon-action'>
            <Popover
              content={<Button onClick={onRemoveMessage}>Delete</Button>}
              trigger='click'>
              <Button
                type='link'
                shape='circle'
                icon={<EllipsisOutlined style={{ fontSize: '15px' }} />}
              />
            </Popover>
          </div>
        )}
        <div className='message__bubble-area'>
          {(idAudio(attachments) || text || isTyping) && (
            <div className='message__bubble-area-text'>
              <div className='message__bubble'>
                <p className='message__text'>
                  {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                    <Emoji key={i} emoji={match} set='apple' size={16} />
                  ))}
                </p>
                {isTyping && (
                  <div className='message__typing'>
                    <span />
                    <span />
                    <span />
                  </div>
                )}
                {idAudio(attachments) && (
                  <AudioElem
                    key={attachments[0]._id}
                    audioSrc={attachments[0].url}
                  />
                )}
              </div>
            </div>
          )}
          {attachments && !idAudio(attachments) && (
            <div className='message__attachements'>
              {attachments.map((item) => renderAttachment(item))}
            </div>
          )}
        </div>

        {createdAt && (
          <span className='message__date'>{<Time date={createdAt} />}</span>
        )}
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
  attachments: [],
};

Message.protTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  attachements: PropTypes.array,
  isTyping: PropTypes.bool,
  audio: PropTypes.string,
};

export default Message;
