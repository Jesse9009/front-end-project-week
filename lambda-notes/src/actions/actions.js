import axios from 'axios';
import thunk from 'redux-thunk';

export const FETCHING = 'FETCHING';
export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';

//GET
export const getNotes = () => {
  return dispatch => {
    dispatch({ type: FETCHING });
    axios
      .get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        // console.log(response.data);
        dispatch({ type: SUCCESS, payload: response.data });
        // this.setState({ notes: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FAIL, payload: 'Error getting notes' });
      });
  };
};

//POST

//UPDATE

//DELETE
