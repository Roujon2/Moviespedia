import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function firebaseDatabase(){
    const firebaseConfig = {
        apiKey: "AIzaSyCuvM5HI0h4ESNGkAcCbuk41By20zLtgDc",
        authDomain: "moviespedia-64e3a.firebaseapp.com",
        projectId: "moviespedia-64e3a",
        storageBucket: "moviespedia-64e3a.appspot.com",
        messagingSenderId: "855934472985",
        appId: "1:855934472985:web:c87ac840bfd63cc52d2b88",
        measurementId: "G-9814KBBDPH"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database =  getDatabase(app);

    return database;
}

export default firebaseDatabase;

