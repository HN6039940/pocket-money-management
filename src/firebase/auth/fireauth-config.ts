import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { auth, db } from "../firestore/firestore-config";

// type
export type UserInfo = {
  name: string;
  isLogin: boolean;
};

const isFirebaseError = (error: unknown): error is FirebaseError => {
  return error instanceof FirebaseError;
};

// Create a new user with email and password

export const signupEmailUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userInfo = userCredential.user;
    return userInfo;
  } catch (error) {
    if (isFirebaseError(error)) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-exists") {
        console.log("既に登録されているメールアドレスです");
      }
    }
    throw error;
  }
};

// log in with email and password

export const logInEmailUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userInfo = userCredential.user;
    const uid = userCredential.user?.uid;
    if (uid) {
      const userDoc = doc(db, "Users", uid);
      await updateDoc(userDoc, {
        isLogin: true,
      });
    }
    return userInfo;
  } catch (error) {
    if (isFirebaseError(error)) {
      console.log(error.code);
      console.log(error.message);
    }
    throw error;
  }
};

// logOut User
export const logOutUser = async () => {
  try {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const userDoc = doc(db, "Users", uid);
      await updateDoc(userDoc, {
        isLogin: false,
      });
    }
    await signOut(auth);
  } catch (error) {
    if (isFirebaseError(error)) {
      console.log(error.code);
      console.log(error.message);
    }
    throw error;
  }
};

// isLogin User
export const isLoginUser = async () => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    const userDoc = doc(db, "Users", uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const { isLogin } = docSnap.data() as UserInfo;
      return isLogin;
    }
  } else {
    throw new Error("ログインしていません");
  }
};
