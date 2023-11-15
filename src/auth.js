import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

export { auth, signInWithGoogle };