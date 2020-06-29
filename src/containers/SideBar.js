import React, { useState } from 'react';
import { connect } from 'react-redux';

import { UserApi, DialogsApi } from '../utils/api';
import { SideBar } from '../components';

const SideBarContainer = () => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleCancel = () => {
    setVisible(false);
    setSelectedUserId('');
  };
  const onSearch = (value) => {
    setIsLoading(true);
    UserApi.findUsers(value)
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const createNewDialog = () => {
    DialogsApi.create(selectedUserId, messageText)
      .then(({ data }) => {
        handleCancel();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const onChangeTextArea = (e) => {
    e.preventDefault();
    setMessageText(e.target.value);
  };
  const onSelectUser = (id) => {
    setSelectedUserId(id);
  };
  return (
    <SideBar
      users={users}
      visible={visible}
      isLoading={isLoading}
      onSearch={onSearch}
      createNewDialog={createNewDialog}
      setVisible={setVisible}
      handleCancel={handleCancel}
      onSelectUser={onSelectUser}
      messageText={messageText}
      onChangeTextArea={onChangeTextArea}
      selectedUserId={selectedUserId}
    />
  );
};

export default connect()(SideBarContainer);
