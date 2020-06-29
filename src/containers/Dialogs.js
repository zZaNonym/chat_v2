import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '../core/socket';
import { Dialogs as BaseDialogs } from '../components';

import { dialogsActions } from '../redux/action';

const Dialogs = ({ fetchDialogs, items, currentDialog, userId }) => {
  const [value, setValue] = useState('');
  const [filtredItems, setFiltredItems] = useState([...items]);

  const onChangeInput = (value = '') => {
    setFiltredItems(
      items.filter(
        (dialog) =>
          dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >=
          0
      )
    );
  };
  useEffect(() => {
    if (items.length) {
      onChangeInput();
    }
    setFiltredItems([...items]);
  }, [items]);

  useEffect(() => {
    if (!items.length) {
      fetchDialogs();
    } else {
      setFiltredItems(items);
    }
    socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
    socket.on('SERVER:DIALOG_DELETED', fetchDialogs);
    socket.on('SERVER:MESSAGE_CREATED', fetchDialogs);
    socket.on('SERVER:MESSAGE_DELETED', fetchDialogs);
    return () => {
      socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
      socket.removeListener('SERVER:MESSAGE_CREATED', fetchDialogs);
      socket.removeListener('SERVER:MESSAGE_DELETED', fetchDialogs);
      socket.removeListener('SERVER:DIALOG_DELETED', fetchDialogs);
    };
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    onChangeInput(value);
  };

  return (
    <BaseDialogs
      currentDialog={currentDialog}
      value={value}
      userId={userId}
      filtredItems={filtredItems}
      onChange={onChange}
    />
  );
};

export default connect(
  ({ dialogs, user }) => ({
    userId: user.data ? user.data._id : '',
    items: dialogs.items,
    currentDialog: dialogs.currentDialog,
  }),
  dialogsActions
)(Dialogs);
