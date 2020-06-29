import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import socket from '../core/socket';
import { tictactoeActions } from '../redux/action';
import { Modal } from 'antd';

import { openNotification } from '../utils/helpers';

import { TicTacToe } from '../components';

const TicTacToeContainer = ({
  author,
  step,
  point,
  cells,
  setAuthor,
  setStep,
  setValue,
  setCells,
  setPlayGame,
  playGame,
  currentDialog,
}) => {
  const [visible, setVisible] = useState(false);

  const handlePlay = () => {
    setVisible(true);
  };
  const handlePlayYes = () => {
    setPlayGame(true);
    setAuthor(true);
  };
  const handlePlayNo = () => {
    openNotification({
      type: 'error',
      title: 'TicTacToe',
      text: 'Oponent refuse play with you',
    });
  };
  const handleClose = () => {
    setPlayGame(false);
    openNotification({
      type: 'error',
      title: 'TicTacToe',
      text: 'Oponent leave the game !',
    });
  };
  const onClickClose = () => {
    setPlayGame(false);
    socket.emit('TICTACTOE:CLOSE', currentDialog);
  };
  const handleChoseSymbol = (symbol) => {
    setValue(symbol);
    setStep(symbol);
    socket.emit('TICTACTOE:START', { currentDialog, value: symbol });
  };

  const handleStart = (valueCpy) => {
    setValue(valueCpy === 'X' ? 'O' : 'X');
    setStep(valueCpy);
  };

  const checkCombination = (cells) => {
    if (
      cells[0].value === cells[1].value &&
      cells[1].value === cells[2].value &&
      cells[2].value === 'X'
    )
      return 'X';
    else if (
      cells[3].value === cells[4].value &&
      cells[4].value === cells[5].value &&
      cells[5].value === 'X'
    )
      return 'X';
    else if (
      cells[6].value === cells[7].value &&
      cells[7].value === cells[8].value &&
      cells[8].value === 'X'
    )
      return 'X';
    else if (
      cells[0].value === cells[3].value &&
      cells[3].value === cells[6].value &&
      cells[6].value === 'X'
    )
      return 'X';
    else if (
      cells[1].value === cells[4].value &&
      cells[4].value === cells[7].value &&
      cells[7].value === 'X'
    )
      return 'X';
    else if (
      cells[2].value === cells[5].value &&
      cells[5].value === cells[8].value &&
      cells[8].value === 'X'
    )
      return 'X';
    else if (
      cells[0].value === cells[4].value &&
      cells[4].value === cells[8].value &&
      cells[8].value === 'X'
    )
      return 'X';
    else if (
      cells[2].value === cells[4].value &&
      cells[4].value === cells[6].value &&
      cells[6].value === 'X'
    )
      return 'X';
    if (
      cells[0].value === cells[1].value &&
      cells[1].value === cells[2].value &&
      cells[2].value === 'O'
    )
      return 'O';
    else if (
      cells[3].value === cells[4].value &&
      cells[4].value === cells[5].value &&
      cells[5].value === 'O'
    )
      return 'O';
    else if (
      cells[6].value === cells[7].value &&
      cells[7].value === cells[8].value &&
      cells[8].value === 'O'
    )
      return 'O';
    else if (
      cells[0].value === cells[3].value &&
      cells[3].value === cells[6].value &&
      cells[6].value === 'O'
    )
      return 'O';
    else if (
      cells[1].value === cells[4].value &&
      cells[4].value === cells[7].value &&
      cells[7].value === 'O'
    )
      return 'O';
    else if (
      cells[2].value === cells[5].value &&
      cells[5].value === cells[8].value &&
      cells[8].value === 'O'
    )
      return 'O';
    else if (
      cells[0].value === cells[4].value &&
      cells[4].value === cells[8].value &&
      cells[8].value === 'O'
    )
      return 'O';
    else if (
      cells[2].value === cells[4].value &&
      cells[4].value === cells[6].value &&
      cells[6].value === 'O'
    )
      return 'O';
    else return false;
  };

  const handleClick = (index) => {
    socket.emit('TICTACTOE:STEP', {
      currentDialog,
      index,
    });
  };

  const handleStep = (index) => {
    setCells(index);
    const winner = checkCombination(cells);
    if (winner) {
      setStep('');
      if (point === winner) {
        openNotification({
          type: 'success',
          title: 'TicTacToe',
          text: 'You win the round !!',
          duration: 5,
        });
      } else {
        openNotification({
          type: 'error',
          title: 'TicTacToe',
          text: 'You lose the round !!',
          duration: 5,
        });
      }
    } else setStep(step === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    socket.on('TICTACTOE:CLOSE', handleClose);
    socket.on('TICTACTOE:STEP', handleStep);
    socket.on('TICTACTOE:PLAY', handlePlay);
    socket.on('TICTACTOE:PLAY-YES', handlePlayYes);
    socket.on('TICTACTOE:PLAY-NO', handlePlayNo);
    socket.on('TICTACTOE:START', handleStart);
    return () => {
      socket.removeListener('TICTACTOE:PLAY', handlePlay);
      socket.removeListener('TICTACTOE:PLAY-YES', handlePlayYes);
      socket.removeListener('TICTACTOE:START', handleStart);
      socket.removeListener('TICTACTOE:STEP', handleStep);
      socket.removeListener('TICTACTOE:PLAY-NO', handlePlayNo);
      socket.removeListener('TICTACTOE:CLOSE', handleClose);
    };
  }, [currentDialog, point, step, cells]);

  return (
    <>
      {visible && (
        <Modal
          title='TicTacToe'
          visible={visible}
          onOk={() => {
            setAuthor(false);
            setPlayGame(true);
            socket.emit('TICTACTOE:PLAY-YES', currentDialog);
            setVisible(false);
          }}
          onCancel={() => {
            socket.emit('TICTACTOE:PLAY-NO', currentDialog);
            setVisible(false);
          }}
          cancelText='Refuse'
          okText='Accept'>
          <p>Do you play tictactoe?</p>
        </Modal>
      )}
      <TicTacToe
        author={author}
        step={step}
        point={point}
        cells={cells}
        show={playGame}
        handleClose={onClickClose}
        handleChoseSymbol={handleChoseSymbol}
        handleClick={handleClick}
      />
    </>
  );
};

export default connect(
  ({ tictactoe }) => ({
    author: tictactoe.author,
    step: tictactoe.step,
    point: tictactoe.value,
    cells: tictactoe.cells,
  }),
  tictactoeActions
)(TicTacToeContainer);
