import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD93AVpV6GnHj1xMZ-n85zAu-9RXjwST_E",
    authDomain: "afaf-backup.firebaseapp.com",
    databaseURL: "https://afaf-backup-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "afaf-backup",
    storageBucket: "afaf-backup.appspot.com",
    messagingSenderId: "182405219893",
    appId: "1:182405219893:web:64ed2db3130f670156d37c",
  };

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app)