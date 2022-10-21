import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyArq39pMU-w0M0VK9zm-rplQawWr6lIpIM",
    authDomain: "salao-vany-buava.firebaseapp.com",
    projectId: "salao-vany-buava",
    storageBucket: "salao-vany-buava.appspot.com",
    messagingSenderId: "802020254702",
    appId: "1:802020254702:web:8138fb6ae409b50c6ea4ff",
    measurementId: "G-RWB2ZERSZX"
};

export const app = initializeApp(firebaseConfig);
export const dbRef = ref(getDatabase(app))