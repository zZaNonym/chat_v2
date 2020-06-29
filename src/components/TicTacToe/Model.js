import React from 'react';

import style from './TicTacToe.module.scss';

import { ArrowLeftOutlined } from '@ant-design/icons';

const Model = ({
  handleClose,
  show,
  author,
  step,
  point,
  cells,
  handleChoseSymbol,
  handleClick,
}) => {
  const choseTheSymbol = () => {
    return (
      <div className={style.choseSymbol_container}>
        {author ? (
          <>
            <div
              onClick={() => handleChoseSymbol('X')}
              className={style.tictactoe_table_cell}>
              X
            </div>
            <div
              onClick={() => handleChoseSymbol('O')}
              className={style.tictactoe_table_cell}>
              O
            </div>
          </>
        ) : (
          <div className={style.choseSymbol_container_wait}>
            <p>Wait oponent to chose symbol..</p>
          </div>
        )}
      </div>
    );
  };
  return (
    show && (
      <div className={style.tictactoe_model}>
        <div className={style.tictactoe_model_box}>
          <ArrowLeftOutlined
            onClick={handleClose}
            className={style.tictactoe_model_box_close}
          />

          {point && point !== 'M' ? (
            <div className={style.tictactoe_table}>
              {cells.map((cell, index) => {
                return (
                  <div
                    style={{
                      backgroundColor: cell.value ? '#14a798a6' : '14bdac',
                    }}
                    key={index}
                    onClick={() =>
                      !cell.value && point === step && handleClick(index)
                    }
                    className={style.tictactoe_table_cell}>
                    {cell.value}
                  </div>
                );
              })}
            </div>
          ) : (
            choseTheSymbol()
          )}
        </div>
        ;
      </div>
    )
  );
};

export default Model;
