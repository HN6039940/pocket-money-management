import {
  doc,
  getDoc,
  Timestamp,
  setDoc,
  arrayUnion,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { db, auth } from "./firestore-config";

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
        expense: expense.map((item) => ({
          ...item,
          date: (item.date as Timestamp).toDate().toISOString() as string,
        })),
        incomes: incomes.map((item) => ({
          ...item,
          date: (item.date as Timestamp).toDate().toISOString() as string,
        })),
      };
    } else {
      // doc.data() will be undefined in this case
      return undefined;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("ドキュメントを取得できませんでした");
    }
    return undefined;
  }
};

// オンスナップショットの設定

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
        callback(undefined);
      }
    },
    () => {
      throw new Error("ドキュメントを取得できませんでした");
    },
  );
};

//新規ユーザ作成時のみ新しいドキュメントを作成

export const createNewDocument = async (uid: string) => {
  const docRef = doc(db, `Datas/${uid}`);
  try {
    await setDoc(docRef, {
      expense: [],
      incomes: [],
    });
  } catch (error) {
    throw new Error("ドキュメントを作成できませんでした");
  }
};

// 支出または収入のデータをフィールドにあるマップアレイに更新する
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
    } else {
      const { amount, date, useruid, id } = data;
      const docRef = doc(db, `Datas/${useruid}`);
      await updateDoc(docRef, {
        incomes: arrayUnion({ amount, date, id }),
      });
    }
  } catch (error) {
    throw new Error("ドキュメントを作成できませんでした");
  }
};

// 支出または収入のデータをフィールドにあるマップアレイから削除する
// その場合fireStoreはマップアレイの直接削除が行えないので、新しいマップアレイを作成して更新している。
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

// 新しいユーザドキュメントを作成
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
  } catch (error) {
    throw new Error("ユーザー情報を作成できませんでした");
  }
};
