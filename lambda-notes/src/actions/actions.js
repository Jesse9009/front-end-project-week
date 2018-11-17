import axios from 'axios';
import thunk from 'redux-thunk';

export const FETCHING = 'FETCHING';
export const GET_SUCCESS = 'GET_SUCCESS';
export const SUCCESS = 'SUCCESS';
export const CREATED = 'CREATED';
export const DELETED = 'DELETED';
export const EDITED = 'EDITED';
export const FAIL = 'FAIL';

//GET
export const getNotes = () => {
  return dispatch => {
    dispatch({ type: FETCHING });
    axios
      .get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        // console.log(response.data);
        dispatch({ type: GET_SUCCESS, payload: response.data });
        // this.setState({ notes: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: FAIL, payload: 'Error getting notes' });
      });
  };
};

//POST

export const createNote = note => {
  return dispatch => {
    axios
      .post('https://fe-notes.herokuapp.com/note/create', note)
      .then(res => {
        console.log('response from createNote ', res);
        dispatch({ type: SUCCESS });
      })
      .catch(err => {
        dispatch({ type: FAIL, payload: 'Error getting notes' });
      });
  };
};

//UPDATE

export const editNote = (id, note) => {
  return dispatch => {
    axios
      .put(`https://fe-notes.herokuapp.com/note/edit/${id}`, note)
      .then(res => {
        console.log('response from editNote ', res);
        dispatch({ type: SUCCESS });
        this.setState({ title: '', body: '', noteEdited: true });
      })
      .catch(err => {
        dispatch({ type: FAIL, payload: 'Error editing note' });
      });
  };
};

//DELETE

export const deleteNote = id => {
  // console.log(`${id}`, ' deleted');
  return dispatch => {
    axios
      .delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(res => {
        console.log('response from deleteNote: ', res);
        dispatch({ type: SUCCESS });
      })
      .catch(err => {
        console.log('error deleting');
        dispatch({ type: FAIL, payload: 'Error deleting note' });
      });
  };
};
