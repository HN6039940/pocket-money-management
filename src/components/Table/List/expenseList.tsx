import { type ExpensesItem } from "../../../store/slice/financeSlice";
import { formattedDateByja } from "../../../utils/format";
import { useAppSelector } from "../../../store/slice/Hooks/hooks";
import { deleteFinanceData } from "../../../firebase/firestore/firestore-financeData-operations";

const ExpenseList = (props: ExpensesItem) => {
  const { id, date, amount, label } = props;
  const { id: useruid } = useAppSelector((state) => state.auth);
  const dateobj = new Date(date as string);
  const formatDate = formattedDateByja(date as string);
  const handleCLick = async () => {
    await deleteFinanceData({ id, amount, date: dateobj, useruid, label });
  };
  return (
    <div className="grid grid-cols-4 items-center bg-green-500">
      <li className="flex-grow text-xl">{formatDate}</li>
      <li className=" flex-grow text-xl">{amount}円</li>
      <li className="flex-grow text-xl">{label}</li>
      <button className="block p-4 text-xl" onClick={handleCLick}>
        delete
      </button>
    </div>
  );
};

export default ExpenseList;
