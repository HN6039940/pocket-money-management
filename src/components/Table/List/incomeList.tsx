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
    <div className="  border-gray grid grid-cols-3 items-center border-b-2 p-2">
      <li className=" flex-grow text-xl">{formatDate}</li>
      <li className="flex-grow text-xl">{amount}円</li>
      <div className="text-center">
        <button
          className="border-whiter inline-block rounded-md border  bg-gray-800 px-4 py-2 text-xl text-white"
          onClick={handleCLick}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default IncomeList;
