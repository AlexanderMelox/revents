import { SubmissionError } from 'redux-form'
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

export const registerUser = (user) => {
  return async (dispatch, getState, { getFirebase,  getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in auth
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
      console.log(createdUser);
      // update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      });
      // create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdUser.uid}`, {...newUser});
      // closes the modal
      dispatch(closeModal())
    } catch(error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  }
};

export const socialLogin = (selectedProvider) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      dispatch(closeModal());
      await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      });
    } catch(error) {
      console.log(error)
    }
  }
}