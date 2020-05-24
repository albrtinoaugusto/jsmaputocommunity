// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAC1UeyauX6OTUswO8mq9KGUGAWZj2RYFA",
    authDomain: "aam-school-app.firebaseapp.com",
    databaseURL: "https://aam-school-app.firebaseio.com",
    projectId: "aam-school-app",
    storageBucket: "aam-school-app.appspot.com",
    messagingSenderId: "127295356367",
    appId: "1:127295356367:web:7099f250e4ab32334026ba",
    measurementId: "G-EE9F2P25SC"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const bag = firebase.storage();

//db.settings({timestampsInSnapshots: true});


/*
function writeData() {
    db.collection('admins/').add({
            id: "xxxsdhgksgsgse",
            name: "Albertino",
            username: "Gostoso"
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}





*/