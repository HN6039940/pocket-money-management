import { type ExpensesItem } from "../../../store/slice/financeSlice";
import { formattedDateByja } from "../../../utils/format";
import { useAppSelector } from "../../../store/slice/Hooks/hooks";
import { deleteFinanceData } from "../../../firebase/firestore/firestore-financeData-operations";

const ExpenseList = (props: ExpensesItem) => {
  const { id, date, amount, label } = props;
  const { id: useruid } = useAppSelector((state) => state.auth);
  const formatDate = formattedDateByja(date as string);

  const dateobj = new Date(date as string);
  const handleCLick = async () => {
    await deleteFinanceData({ id, amount, date: dateobj, useruid, label });
  };

  return (
    <div className="border-gray grid grid-cols-2 items-center justify-center gap-3 border-b-2 p-1 lg:grid-cols-4">
      <li className="sm:text-md flex-grow text-sm md:text-lg  lg:text-xl">
        {formatDate}
      </li>
      <li className=" flex-grow text-sm sm:text-base md:text-lg  ">
        {amount}円
      </li>
      <li className="flex-grow text-sm sm:text-base md:text-lg ">{label}</li>
      <div className=" text-center">
        <button
          className="inline-block rounded-md  bg-gray-800 px-2 py-1 text-sm   text-white md:text-lg lg:px-3 lg:py-2"
          onClick={handleCLick}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
