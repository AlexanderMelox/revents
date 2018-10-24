import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGBD8x4SRA-ff7W08VTU-1BadX_qzStig",
  authDomain: "radiant-raceway-218517.firebaseapp.com",
  databaseURL: "https://radiant-raceway-218517.firebaseio.com",
  projectId: "radiant-raceway-218517",
  storageBucket: "",
  messagingSenderId: "1088475796962",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;