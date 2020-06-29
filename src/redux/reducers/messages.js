const initialState = {
  items: [],
  isLoading: false,
  isTyping: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MESSAGES:SET_ITEMS': {
      return { ...state, items: payload, isLoading: false };
    }
    case 'MESSAGES:SET_IS_LOADING': {
      return { ...state, isLoading: payload };
    }
    case 'MESSAGES:SET_IS_TYPING': {
      return { ...state, isTyping: payload };
    }
    case 'MESSAGES:ADD_MESSAGE': {
      return { ...state, items: [...state.items, payload] };
    }
    case 'MESSAGES:REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== payload),
      };
    }

    default:
      return state;
  }
};
