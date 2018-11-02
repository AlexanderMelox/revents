import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (updatedUser) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    if (updatedUser.dateOfBirth && updatedUser.dateOfBirth._isAMomentObject) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate()
      // console.log(moment(updatedUser.dateOfBirth).toDate());
    }

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Profile updated');
    } catch(error) {
      console.log(error);
    }
  }
}