import { type IncomesItem } from "../../../store/slice/financeSlice";
import { formattedDateByja } from "../../../utils/format";
import { useAppSelector } from "../../../store/slice/Hooks/hooks";
import { deleteFinanceData } from "../../../firebase/firestore/firestore-financeData-operations";
const IncomeList = (props: IncomesItem) => {
  const { id: useruid } = useAppSelector((state) => state.auth);
  const { id, date, amount } = props;
  const dateobj = new Date(date as string);
  const formatDate = formattedDateByja(date as string);
  const handleCLick = async () => {
    await deleteFinanceData({ id, amount, date: dateobj, useruid });
  };
  return (
    <div className="  border-gray grid grid-cols-2 grid-rows-2 items-center border-b-2 p-1 lg:grid-cols-3 lg:grid-rows-1 ">
      <li className=" sm:text-md col-span-2 flex-grow text-sm md:text-lg lg:col-span-1 lg:text-xl">
        {formatDate}
      </li>
      <li className="sm:text-md flex-grow text-sm md:text-lg lg:text-xl">
        {amount}円
      </li>
      <div className="text-center">
        <button
          className="border-whiter inline-block rounded-md border  bg-gray-800 px-2 py-1 text-sm text-white lg:px-3 lg:py-2 lg:text-xl"
          onClick={handleCLick}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default IncomeList;
