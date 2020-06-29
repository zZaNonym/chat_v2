const Actions = {
  setAuthor: (bool) => ({
    type: 'TICTACTOE:SET_AUTHOR',
    payload: bool,
  }),
  setStep: (step) => ({
    type: 'TICTACTOE:SET_STEP',
    payload: step,
  }),
  setValue: (value) => ({
    type: 'TICTACTOE:SET_VALUE',
    payload: value,
  }),
  setCells: (index) => ({
    type: 'TICTACTOE:SET_CELLS',
    payload: index,
  }),

  setPlay: (payload) => ({
    type: 'TICTACTOE:SET_PLAY',
    payload: payload,
  }),
};

export default Actions;
