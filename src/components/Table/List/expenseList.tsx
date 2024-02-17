import { type ExpensesItem } from "../../../store/slice/financeSlice";
import { formattedDate } from "../../../utils/format";

const expenseList = (props: ExpensesItem) => {
  const { id, date, amount, label } = props;
  const formatDate = formattedDate(date as string);
  return (
    <div className="item-center flex items-center bg-green-500">
      <li className="flex-grow text-xl">{formatDate}</li>
      <li className=" flex-grow text-xl">{amount}円</li>
      <li className="flex-grow text-xl">{label}</li>
      <button className="block p-4 text-xl">delete</button>
    </div>
  );
};

export default expenseList;
