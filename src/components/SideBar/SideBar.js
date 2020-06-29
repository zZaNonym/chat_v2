import React from 'react';

import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Modal, Select, Input } from 'antd';

import { Dialogs } from '../../containers';

const { Option } = Select;
const { TextArea } = Input;

export default function SideBar({
  visible,
  setVisible,
  handleCancel,
  users,
  onSelectUser,
  createNewDialog,
  onSearch,
  isLoading,
  onChangeTextArea,
  messageText,
  selectedUserId,
}) {
  const options = users.map((user) => (
    <Option key={user._id}>{user.fullname}</Option>
  ));

  return (
    <div className='chat__sidebar'>
      <div className='chat__sidebar-header'>
        <div>
          <TeamOutlined />
          <span>Dialogs list</span>
        </div>
        <div>
          <Button
            onClick={() => setVisible(true)}
            type='link'
            shape='circle'
            icon={<FormOutlined style={{ fontSize: '15px' }} />}
          />
        </div>
      </div>

      <div className='chat__sidebar-dialogs'>
        <Dialogs />
      </div>
      <Modal
        title='Create new dialog'
        visible={visible}
        onOk={createNewDialog}
        okText={'Create'}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            disabled={!messageText}
            key='submit'
            type='primary'
            loading={isLoading}
            onClick={createNewDialog}>
            Create
          </Button>,
        ]}
        onCancel={handleCancel}>
        <Select
          showSearch
          onSelect={onSelectUser}
          placeholder={'Find user by fullname or email'}
          style={{ width: '100%' }}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={onSearch}
          notFoundContent={null}>
          {options}
        </Select>
        {selectedUserId && (
          <>
            <br />
            <br />
            <TextArea
              placeholder='Write message text for your new friend'
              autoSize={{ minRows: 1, maxRows: 6 }}
              onChange={onChangeTextArea}
              value={messageText}
            />
          </>
        )}
      </Modal>
    </div>
  );
}

SideBar.defaultProps = {
  users: [],
};
