const firebaseConfig = {
    apiKey: "AIzaSyCEyEWpH0p1a884QCI1zWBdJMW5D6MqYl0",
    authDomain: "profile-aab48.firebaseapp.com",
    databaseURL: "https://profile-aab48-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "profile-aab48",
    storageBucket: "profile-aab48.firebasestorage.app",
    messagingSenderId: "5810591291",
    appId: "1:5810591291:web:6bc27338045b42adf9ae1e",
    measurementId: "G-W2WD0ETJWX"
  };
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const todoRef = database.ref("todos");

