const initialState = {
  play: false,
  author: null,
  step: '',
  value: '',
  cells: [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TICTACTOE:SET_AUTHOR': {
      return { ...state, author: payload };
    }
    case 'TICTACTOE:SET_STEP': {
      return { ...state, step: payload };
    }
    case 'TICTACTOE:SET_VALUE': {
      return { ...state, value: payload };
    }
    case 'TICTACTOE:SET_PLAY': {
      const cells = initialState.cells.map((cell) => {
        cell.value = '';
        return cell;
      });
      return { ...initialState, cells: [...cells], play: payload };
    }
    case 'TICTACTOE:SET_CELLS': {
      return {
        ...state,
        cells: [
          ...state.cells.map((cell, key) => {
            if (payload === key) cell.value = state.step;
            return cell;
          }),
        ],
      };
    }

    default:
      return state;
  }
};
