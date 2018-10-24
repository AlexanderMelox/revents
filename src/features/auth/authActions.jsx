import { SubmissionError } from 'redux-form'
import { SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';

export const login = (credentials) => {
  return async (dispatch, getState, { getFirebase }) => {
    // Gets access to all the firebase methods
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password )
      dispatch(closeModal());
    } catch(error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Email or Password is incorrect'
      });
    }
  }
}

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}