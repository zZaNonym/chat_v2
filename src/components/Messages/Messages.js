import React from 'react';
import { Empty, Spin, Modal } from 'antd';

import './Messages.scss';
import { Message } from '../../components';

const Messages = ({
  items,
  isLoading,
  messagesRef,
  userId,
  onRemoveMessage,
  previewImage,
  setPreviewImage,
  isTyping,
}) => {
  return (
    <div className='chat__dialog-messages'>
      <div className='messages' ref={messagesRef}>
        {isLoading ? (
          <Spin
            className='messages-spin'
            size='large'
            tip='Messages loading...'
          />
        ) : items.length ? (
          items.map((item, key) => {
            return (
              <Message
                key={key}
                isMe={userId === item.user._id}
                {...item}
                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                setPreviewImage={setPreviewImage}
              />
            );
          })
        ) : (
          <Empty description='No messages' />
        )}
        {isTyping && <Message isTyping={true} user={{}} />}

        <Modal
          visible={!!previewImage}
          closable={false}
          onCancel={() => setPreviewImage(null)}
          footer={null}>
          <img src={previewImage} style={{ width: '100%' }} alt='Preview' />
        </Modal>
      </div>
    </div>
  );
};

export default Messages;
