import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCR4BhUskRJPijqaBI-6dn-hChxFpz7Ltg",
  authDomain: "netflix-clone-bf323.firebaseapp.com",
  projectId: "netflix-clone-bf323",
  storageBucket: "netflix-clone-bf323.firebasestorage.app",
  messagingSenderId: "871487059201",
  appId: "1:871487059201:web:6f28f9e1f13c2ace579700"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log('Something went wrong',error)
        toast.error(error.code)
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log('Something went wrong',error)
        toast.error(error.code)
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, logout, signup};