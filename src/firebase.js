// Initialize Firebase
import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config()
const config = {
   apiKey: "AIzaSyDjTxRYckZvCRhEmfsVTvtPLNnZMQKvNjg",
   authDomain: "grocerylist-dev.firebaseapp.com",
   databaseURL: "https://grocerylist-dev.firebaseio.com",
   projectId: "grocerylist-dev",
   storageBucket: "grocerylist-dev.appspot.com",
   messagingSenderId: "339055522328"
 };firebase.initializeApp(config);

 const ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));
 const listRef = firebase.database().ref('/'+ localStorage.getItem('uid_compare') + '/lists/');
 // const itemsRef = firebase.database().ref('/'+ localStorage.getItem('uid_compare') + '/lists/items');

 export { firebase, ref, listRef };

 // module.exports =  { firebase: firebase, ref: ref };
