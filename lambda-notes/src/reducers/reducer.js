import { FETCHING, SUCCESS, FAIL } from '../actions/actions';

const initialState = {
  notes: [],
  fetching: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetching: true };
    case SUCCESS:
      return { ...state, fetching: false, notes: action.payload };
    case FAIL:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};
