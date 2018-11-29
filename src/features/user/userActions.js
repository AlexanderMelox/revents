import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;
    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate()
    }

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Profile updated');
    } catch(error) {
      console.log(error);
    }
  }
}

export const uploadProfileImage = (file, fileName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: fileName
    };

    try {
      // Upload the file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // Get the url of image
      let downloadULR = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      // get userDoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has a photo, if not updated profile with new image
      if (!userDoc.data().photoURL) {
        // Updates firestore documents
        await firebase.updateProfile({
          photoURL: downloadULR
        });
        // updates profile inside firebase authentication
        await user.updateProfile({
          photoURL: downloadULR
        });
      }
      // add the new photo to photos collection
      return await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      }, {
        name: fileName,
        url: downloadULR
      });
    } catch (error) {
      console.log(error);
      throw new Error('Problem uploading photo');
    }
  }
}