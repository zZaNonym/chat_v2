import React, { useState } from 'react';
import { connect } from 'react-redux';

import { messagesActions } from '../redux/action';
import socket from '../core/socket';

import { FilesApi } from '../utils/api';
import { ChatInput } from '../components';

const ChatInputContainer = ({ sendMessages, dialogId, user }) => {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [isLoading, setLoading] = useState(false);

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const toggleEmojiPicker = () => {
    setEmojiPicker(!emojiPicker);
  };

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };
  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e) => {
      stream.getTracks().forEach((t) => t.stop());
      const file = new File([e.data], 'audio.webm');
      setLoading(true);
      FilesApi.upload(file).then(({ data }) => {
        sendMessages({
          text: null,
          dialogId: dialogId,
          attachments: [data.file._id],
        });
        setLoading(false);
      });
    };
  };

  const onError = (err) => {
    console.log('The following error occured: ' + err);
  };

  const sendMessage = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else if (value || attachments.length) {
      sendMessages({
        text: value,
        dialogId: dialogId,
        attachments: attachments.map((file) => file.uid),
      });
      setValue('');
      setAttachments([]);
    }
  };

  const handleSendMessage = (e) => {
    socket.emit('DIALOGS:TYPING', { dialogId: dialogId, user });

    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  const addEmoji = ({ colons }) => {
    setValue((value + ' ' + colons).trim());
  };

  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setEmojiPicker(false);
    }
  };

  const onHideRecording = () => {
    setIsRecording(false);
  };

  const onSelectFiles = async (files) => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
          status: 'uploading',
        },
      ];
      setAttachments(uploaded);
      // eslint-disable-next-line no-loop-func
      await FilesApi.upload(file).then(({ data }) => {
        uploaded = uploaded.map((item) => {
          if (item.uid === uid) {
            return {
              status: 'done',
              uid: data.file._id,
              name: data.file.filename,
              url: data.file.url,
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
  };
  const removeAttachment = (file) => {
    setAttachments(attachments.filter((item) => item.uid !== file.uid));
  };
  return (
    <ChatInput
      onRecord={onRecord}
      removeAttachment={removeAttachment}
      handleOutsideClick={handleOutsideClick}
      handleSendMessage={handleSendMessage}
      sendMessage={sendMessage}
      toggleEmojiPicker={toggleEmojiPicker}
      addEmoji={addEmoji}
      dialogId={dialogId}
      value={value}
      setValue={setValue}
      emojiPicker={emojiPicker}
      attachments={attachments}
      onSelectFiles={onSelectFiles}
      isRecording={isRecording}
      onHideRecording={onHideRecording}
      isLoading={isLoading}
    />
  );
};

export default connect(
  ({ dialogs, user }) => ({ dialogId: dialogs.currentDialog, user: user.data }),
  messagesActions
)(ChatInputContainer);
