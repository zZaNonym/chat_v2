import React, { useEffect } from 'react';

import { Input, Button } from 'antd';
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Picker } from 'emoji-mart';
import { UploadField } from '@navjobs/upload';
import { UploadFiles } from '../../components';
import './ChatInput.scss';

const ChatInput = ({
  sendMessage,
  dialogId,
  attachments,
  removeAttachment,
  toggleEmojiPicker,
  handleSendMessage,
  addEmoji,
  handleOutsideClick,
  value,
  emojiPicker,
  setValue,
  onSelectFiles,
  onRecord,
  isRecording,
  onHideRecording,
  isLoading,
}) => {
  useEffect(() => {
    const el = document.querySelector('.chat-input__smile-btn');
    document.addEventListener('click', handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener('click', handleOutsideClick.bind(this, el));
    };
  }, []);
  return (
    <div className='chat-input'>
      <div className='chat-input__smile-btn'>
        {emojiPicker && (
          <div className='chat-input__emoji-picker'>
            <Picker onSelect={addEmoji} set='apple' />
          </div>
        )}
        <Button
          onClick={toggleEmojiPicker}
          type='link'
          shape='circle'
          icon={<SmileOutlined />}
        />
      </div>
      {isRecording ? (
        <div className='chat-input__record-status'>
          <i className='chat-input__record-status-bubble'></i>
          Recording...
          <Button
            onClick={onHideRecording}
            type='link'
            shape='circle'
            icon={<CloseOutlined />}
            className='stop-recording'
          />
        </div>
      ) : (
        <Input
          id='message'
          name='message'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleSendMessage}
          size='large'
          placeholder='Write your message'
        />
      )}

      <div className='chat-input__action'>
        <UploadField
          onFiles={onSelectFiles}
          containerProps={{
            className: 'chat-input__actions-upload-btn',
          }}
          uploadProps={{
            accept: '.jpg,.jpeg,.png,.gif,.bmp',
            multiple: 'multiple',
          }}>
          <CameraOutlined
            style={{
              border: '0',
              color: '#202020',
              boxShadow: 'none',
              opacity: '0.5',
              cursor: 'pointer',
            }}
          />
        </UploadField>

        {isLoading ? (
          <Button type='link' shape='circle' icon={<LoadingOutlined />} />
        ) : value || isRecording || attachments.length ? (
          <Button
            onClick={() => {
              sendMessage(value, dialogId);
            }}
            type='link'
            shape='circle'
            icon={<CheckCircleOutlined />}
          />
        ) : (
          <Button
            onClick={onRecord}
            type='link'
            shape='circle'
            icon={<AudioOutlined />}
          />
        )}
      </div>
      {attachments && attachments.length > 0 && (
        <div className='chat-input__attachments'>
          <UploadFiles
            removeAttachment={removeAttachment}
            attachments={attachments}
          />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
