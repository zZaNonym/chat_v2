import React from 'react';
import { connect } from 'react-redux';

import { Status } from '../components';

const StatusContainer = ({ currentDialog, items, userId }) => {
  if (!items.length || !currentDialog) {
    return null;
  }
  const currentDialogObj = items.filter(
    (item) => item._id === currentDialog
  )[0];
  let partner;

  if (currentDialogObj.author._id === userId) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj.author;
  }
  return (
    <Status
      online={partner.isOnline}
      lastSeen={partner.last_seen}
      fullname={partner.fullname}
    />
  );
};

export default connect(({ dialogs, user }) => ({
  currentDialog: dialogs.currentDialog,
  items: dialogs.items,
  userId: user.data ? user.data._id : '',
}))(StatusContainer);
