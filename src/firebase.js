import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import { 
    addDoc, 
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBtkgWouFlTYo68JRVKA1F03sfyU0hEh74",
  authDomain: "netflix-clone-1403c.firebaseapp.com",
  projectId: "netflix-clone-1403c",
  storageBucket: "netflix-clone-1403c.firebasestorage.app",
  messagingSenderId: "408222717877",
  appId: "1:408222717877:web:b1cfacc6e501251697abfc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try { 
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));;
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));;
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};