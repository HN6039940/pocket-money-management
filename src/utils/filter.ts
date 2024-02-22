import { formattedDateByja } from "./format";
import {
  type IncomeDataObject,
  ExpenseDataObject,
} from "../store/slice/chartSlice";

// const isExpense = (
//   data: IncomeDataObject[] | ExpenseDataObject[],
// ): data is ExpenseDataObject[] => {
//   return "label" in data[0];
// };

// 日付が月頭から月末まで特定の期間内に存在するか
export const filterMonthByPieChart = (
  data: IncomeDataObject[] | ExpenseDataObject[],
  targetDate: { beginMonth: string; endMonth: string },
) => {
  const { beginMonth, endMonth } = targetDate;
  return data.filter((item) => {
    const formattedDate = formattedDateByja(item.date as string);
    return formattedDate >= beginMonth && formattedDate <= endMonth;
  });
};

export const sumAmount = (data: IncomeDataObject[] | ExpenseDataObject[]) => {
  return data.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
};

// 棒グラフ
// 特定の期間内の値と日付を抽出する
export const filterMonthByBarChart = (
  data: IncomeDataObject[] | ExpenseDataObject[],
  targetArray: string[],
) => {
  const targetSetDate = new Set(targetArray);

  // const setArray = Array.from(targetSetDate).map((item) => {
  //   return {
  //     value: 0,
  //     date: item,
  //   };
  // });

  // const reducedData = data.reduce<{
  //   [date: string]: { value: number; date: string };
  // }>((acc, cur) => {
  //   const formattedDate = formattedDateByja(cur.date as string);
  //   if (targetSetDate.has(formattedDate)) {
  //     if (formattedDate in acc) {
  //       return {
  //         ...acc,
  //         [formattedDate]: {
  //           value: acc[formattedDate].value + cur.amount,
  //           date: formattedDate,
  //         },
  //       };
  //     } else {
  //       return {
  //         ...acc,
  //         [formattedDate]: { value: cur.amount, date: formattedDate },
  //       };
  //     }
  //   }
  //   return { ...acc };
  // }, {});

  // ここでsetArrayとreducedDataをマージする。条件はsetArrayのdateとreducedDataのdateが一致する場合はreducedDataのvalueをsetArrayのvalueに代入する

  // const result = setArray
  //   .map((item) => {
  //     if (item.date in reducedData) {
  //       return { value: reducedData[item.date].value, date: item.date };
  //     }
  //     return item;
  //   })
  //   .reverse();

  // return result;

  const reducedData = data.reduce<{ [date: string]: number }>((acc, cur) => {
    const formattedDate = formattedDateByja(cur.date as string);
    if (targetSetDate.has(formattedDate)) {
      acc[formattedDate] = (acc[formattedDate] || 0) + cur.amount;
    }
    return acc;
  }, {});

  return Array.from(targetSetDate)
    .map((date) => ({
      value: reducedData[date] || 0,
      date,
    }))
    .reverse();
};

// エリアチャート
// 月別毎に分けて値を抽出する(当年度分)

export const filterMonthByAreaChart = (
  data: IncomeDataObject[] | ExpenseDataObject[],
) => {
  const thisYear = new Date(formattedDateByja(new Date())).getFullYear();

  const ManthArray = Array.from({ length: 12 }, (_, i) => {
    return {
      date: `${thisYear}-${(i + 1).toString().padStart(2, "0")}`,
      value: 0,
    };
  });

  const reducedData = data.reduce<{
    [key: string]: { date: string; value: number };
  }>((acc, cur) => {
    // 日付から年と月を抽出
    const formattedDate = formattedDateByja(cur.date as string);
    const month = new Date(formattedDate).getMonth() + 1; // getMonthは0から始まるため、1を加える
    const key = `${thisYear}-${month.toString().padStart(2, "0")}`; // キーは "年-月" 形式
    // keyを元に、同じ月のデータ群でまとめる
    // データの形式は{date: "年-月", value: 金額}として、配列に追加する
    if (key in acc) {
      acc[key].value += cur.amount;
    } else {
      acc[key] = { date: key, value: cur.amount };
    }

    return acc;
  }, {});

  const result = ManthArray.map((item) => {
    if (Object.keys(reducedData).includes(item.date)) {
      return { date: item.date, value: reducedData[item.date].value };
    }
    return item;
  });

  return result;
};
