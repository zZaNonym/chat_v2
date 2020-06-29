import React from 'react';
import { Input, Empty } from 'antd';

import orderBy from 'lodash/sortBy';
import './Dialogs.scss';
import { DialogItem } from '../index';

const Dialogs = ({ value, filtredItems, onChange, userId, currentDialog }) => {
  return (
    <div className='dialogs'>
      <div className='dialogs-search'>
        <Input.Search
          value={value}
          placeholder='Input search text'
          onChange={onChange}
        />
      </div>
      <div className='dialogs-list'>
        {filtredItems.length ? (
          orderBy(filtredItems, ['lastMessage.created_at'], ['desc']).map(
            (item) => {
              return (
                <DialogItem
                  currentDialog={currentDialog}
                  key={item._id}
                  userId={userId}
                  {...item}
                />
              );
            }
          )
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='No dialogs with this parameters'
          />
        )}
      </div>
    </div>
  );
};

export default Dialogs;
