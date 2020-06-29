import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import socket from '../core/socket';
import { Messages as BaseMessages } from '../components';

import { messagesActions } from '../redux/action';

const Messages = ({
  currentDialogId,
  fetchMessages,
  addMessages,
  items,
  isLoading,
  userId,
  fetchRemoveById,
  removeById,
  isTyping,
  setIsTyping,
}) => {
  const [previewImage, setPreviewImage] = useState(false);

  let typingTimeoutId = null;

  const toggleIsTyping = (obj) => {
    if (currentDialogId === obj.dialogId) {
      setIsTyping(true);
      clearInterval(typingTimeoutId);
      typingTimeoutId = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    }
  };

  const messagesRef = useRef(null);

  const addNewMessage = (message) => {
    addMessages(message);
  };
  const removeMessage = (message) => {
    removeById(message._id);
  };
  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId);
    }
    socket.on('SERVER:MESSAGE_CREATED', addNewMessage);
    socket.on('SERVER:MESSAGE_DELETED', removeMessage);
    return () => {
      socket.removeListener('SERVER:MESSAGE_CREATED', addNewMessage);
      socket.removeListener('SERVER:MESSAGE_DELETED', removeMessage);
    };
  }, [currentDialogId]);

  useEffect(() => {
    socket.on('DIALOGS:TYPING', toggleIsTyping);
    return () => {
      socket.removeListener('DIALOGS:TYPING', toggleIsTyping);
    };
  });
  useEffect(() => {
    messagesRef.current.scrollTo(0, 9999999);
  }, [items]);

  return (
    <BaseMessages
      onRemoveMessage={fetchRemoveById}
      userId={userId}
      messagesRef={messagesRef}
      isLoading={isLoading}
      items={items}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      isTyping={isTyping}
    />
  );
};

export default connect(
  ({ messages, dialogs, user }) => ({
    currentDialogId: dialogs.currentDialog,
    items: messages.items,
    isLoading: messages.isLoading,
    userId: user.data ? user.data._id : '',
    isTyping: messages.isTyping,
  }),
  messagesActions
)(Messages);
