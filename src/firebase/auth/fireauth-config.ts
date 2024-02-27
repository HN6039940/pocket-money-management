import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";

import { auth, db, googleProvider } from "../firestore/firestore-config";
import {
  createUserDoc,
  createNewDocument,
} from "../firestore/firestore-financeData-operations";

// type
export type UserInfo = {
  name: string;
  isLogin: boolean;
};

const isFirebaseError = (error: unknown): error is FirebaseError => {
  return error instanceof FirebaseError;
};

// Google Sign in
export const googleSignIn = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    if (isFirebaseError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};

// Google User create or update user

export const googleUserCreateOrUpdate = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userInfo = auth.currentUser;
    const uid = auth.currentUser?.uid;
    if (uid) {
      const userDoc = doc(db, "Users", uid);
      const userDocSnap = await getDoc(userDoc);
      if (userDocSnap.exists()) {
        await updateDoc(userDoc, {
          isLogin: true,
        });
      } else {
        await createUserDoc(uid, userInfo?.displayName || "No Name", true);
        await createNewDocument(uid);
      }
    } else {
      throw new Error("ログインしていません");
    }
  } catch (error) {
    if (isFirebaseError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};

// Create a new user with email and password

export const signupEmailUser = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const userInfo = userCredential.user;
    return userInfo;
  } catch (error) {
    if (isFirebaseError(error)) {
      if (error.code === "auth/email-already-exists") {
        throw new Error("このメールアドレスは既に登録されています");
      }
      if (error.code === "auth/invalid-email") {
        throw new Error("メールアドレスが無効です");
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

// log in with email and password

export const logInEmailUser = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
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
      throw new Error(error.message);
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
      throw new Error(error.message);
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
