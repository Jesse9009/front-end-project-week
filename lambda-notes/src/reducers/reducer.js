import {
  FETCHING,
  GET_SUCCESS,
  SUCCESS,
  CREATED,
  DELETED,
  EDITED,
  FAIL
} from '../actions/actions';

const initialState = {
  notes: [],
  fetching: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, fetching: true };
    case GET_SUCCESS:
      return { ...state, fetching: false, notes: action.payload };
    case SUCCESS:
      return { ...state, fetching: false };
    // case DELETED:
    //   return { ...state, fetching: false };
    // case EDITED:
    //   return { ...state, fetching: false };
    case FAIL:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};
