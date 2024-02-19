import { db, auth } from "./firestore-config";
import {
  doc,
  getDoc,
  Timestamp,
  setDoc,
  arrayUnion,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

type FinanceData = {
  expense: {
    id: string;
    amount: number;
    date: string | Timestamp;
    label: string;
  }[];
  incomes: { id: string; amount: number; date: string | Timestamp }[];
};

type submitIncomeData = {
  amount: number;
  date: Date;
  useruid: string;
  id: string;
};

type submitExpenseData = submitIncomeData & {
  label: string;
};

const isExpenseData = (
  data: submitExpenseData | submitIncomeData,
): data is submitExpenseData => {
  return "label" in data;
};

// ------ Firestore Expense And Incomes Data Operations ------

export const getDocRef = async (
  uid: string,
): Promise<FinanceData | undefined> => {
  const docRef = doc(db, `Datas/${uid}`);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { expense, incomes } = docSnap.data() as FinanceData;
      return {
        expense: expense.map((e) => ({
          ...e,
          date: (e.date as Timestamp).toDate().toISOString() as string,
        })),
        incomes: incomes.map((i) => ({
          ...i,
          date: (i.date as Timestamp).toDate().toISOString() as string,
        })),
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error getting document:", error);
    }
    return undefined;
  }
};

// Realtime listener

export const listenToDoc = (
  callback: (data: FinanceData | undefined) => void,
) => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    return () => {};
  }
  const docRef = doc(db, `Datas`, uid);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const { expense, incomes } = docSnap.data() as FinanceData;
        console.log(expense, incomes);
        callback({
          expense: expense.map((item) => ({
            ...item,
            date: (item.date as Timestamp).toDate().toISOString() as string,
          })),
          incomes: incomes.map((item) => ({
            ...item,
            date: (item.date as Timestamp).toDate().toISOString() as string,
          })),
        });
      } else {
        console.log("No such document!");
        callback(undefined);
      }
    },
    (error) => {
      console.log("Error getting document:", error);
    },
  );
};

// create document

export const createNewDocument = async (uid: string) => {
  const docRef = doc(db, `Datas/${uid}`);
  try {
    await setDoc(docRef, {
      expense: [],
      incomes: [],
    });
    console.log("create new document!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

// set update to firestore
export const setFinanceData = async (
  data: submitExpenseData | submitIncomeData,
) => {
  try {
    if (isExpenseData(data)) {
      const { amount, date, useruid, id, label } = data;
      const docRef = doc(db, `Datas/${useruid}`);
      await updateDoc(docRef, {
        expense: arrayUnion({ amount, date, id, label }),
      });
      console.log("Document successfully written!");
    } else {
      const { amount, date, useruid, id } = data;
      const docRef = doc(db, `Datas/${useruid}`);
      await updateDoc(docRef, {
        incomes: arrayUnion({ amount, date, id }),
      });
      console.log("Document successfully written!");
    }
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

// delete data from map in array in firestore
export const deleteFinanceData = async (
  data: submitExpenseData | submitIncomeData,
) => {
  const { useruid } = data;
  try {
    const docRef = doc(db, `Datas/${useruid}`);
    const getDocRef = await getDoc(docRef);
    const { expense, incomes } = getDocRef.data() as FinanceData;

    if (isExpenseData(data)) {
      const { id } = data;
      const newExpense = expense.filter((item) => item.id !== id);
      await updateDoc(docRef, {
        expense: newExpense,
      });
    } else {
      const { id } = data;
      const newIncomes = incomes.filter((item) => item.id !== id);
      await updateDoc(docRef, {
        incomes: newIncomes,
      });
    }
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

// ------ Firestore User Data Operations ------

export const createUserDoc = async (
  uid: string,
  name: string,
  isLogin: boolean,
) => {
  const userDocRef = doc(db, `Users/${uid}`);
  try {
    await setDoc(userDocRef, {
      name,
      isLogin,
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
