import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCRTeDJ3btstvzD2WrlMJZU8aEdPshNtB8",
    authDomain: "afaf-fa771.firebaseapp.com",
    projectId: "afaf-fa771",
    storageBucket: "afaf-fa771.appspot.com",
    messagingSenderId: "483910820722",
    appId: "1:483910820722:web:97b279222c361435b573eb",
    databaseURL: "https://afaf-fa771-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);