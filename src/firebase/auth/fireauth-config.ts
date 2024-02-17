import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { auth } from "../firestore/firestore-config";

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
    await signOut(auth);
    console.log("sign out success");
  } catch (error) {
    if (isFirebaseError(error)) {
      console.log(error.code);
      console.log(error.message);
    }
    throw error;
  }
};
