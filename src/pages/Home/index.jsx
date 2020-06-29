import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import socket from '../../core/socket';

import { Button, Empty, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import './Home.scss';

import { Messages, ChatInput, Status, SideBar } from '../../containers';
import { dialogsActions, tictactoeActions } from '../../redux/action';

import { TicTacToe } from '../../containers';

const Home = ({
  location: { pathname },
  setCurrentDialog,
  currentDialog,
  fetchRemoveDialog,
  play,
  setPlay,
}) => {
  useEffect(() => {
    const dialogId = pathname.split('/').pop();
    setCurrentDialog(dialogId);
  }, [pathname]);
  const handlePlayGame = () => {
    socket.emit('TICTACTOE:PLAY', currentDialog);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handlePlayGame}>Play a game</Menu.Item>
      <Menu.Item>
        <Link
          onClick={() =>
            // eslint-disable-next-line
            confirm('Are you sure ??') && fetchRemoveDialog(currentDialog)
          }
          to='/'
          style={{ color: 'red' }}>
          Remove dialog
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <section className='home'>
      <div className='chat'>
        <SideBar />

        <div className='chat__dialog'>
          {currentDialog ? (
            <>
              <div className='chat__dialog-header'>
                <div />
                <Status />

                <Dropdown overlay={menu} placement='bottomRight'>
                  <Button
                    type='link'
                    shape='circle'
                    icon={<EllipsisOutlined style={{ fontSize: '22px' }} />}
                  />
                </Dropdown>
              </div>
              <Messages />
              <div className='chat__dialog-input'>
                <ChatInput />
              </div>
            </>
          ) : (
            <Empty description='No dialog selected' />
          )}
        </div>
      </div>
      <TicTacToe
        playGame={play}
        setPlayGame={setPlay}
        currentDialog={currentDialog}
      />
    </section>
  );
};

export default connect(
  ({ dialogs, tictactoe }) => ({
    currentDialog: dialogs.currentDialog,
    play: tictactoe.play,
  }),
  { ...dialogsActions, ...tictactoeActions }
)(withRouter(Home));
