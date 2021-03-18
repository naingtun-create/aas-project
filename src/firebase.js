import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVEYEgD9JTFDTJysoTZHSTOeiIQSZB4uw",
    authDomain: "aas-project-ea6a6.firebaseapp.com",
    projectId: "aas-project-ea6a6",
    storageBucket: "aas-project-ea6a6.appspot.com",
    messagingSenderId: "917516521580",
    appId: "1:917516521580:web:c07d9b353ffc0311d08849",
    measurementId: "G-FYDYSZ3FKR"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;
  