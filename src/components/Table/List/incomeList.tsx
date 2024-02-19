import { type IncomesItem } from "../../../store/slice/financeSlice";
import { formattedDate } from "../../../utils/format";
import { useAppSelector } from "../../../store/slice/Hooks/hooks";
import { deleteFinanceData } from "../../../firebase/firestore/firestore-financeData-operations";
const IncomeList = (props: IncomesItem) => {
  const { id: useruid } = useAppSelector((state) => state.auth);
  const { id, date, amount } = props;
  const dateobj = new Date(date as string);
  const formatDate = formattedDate(date as string);
  const handleCLick = async () => {
    await deleteFinanceData({ id, amount, date: dateobj, useruid });
  };
  return (
    <div className="  grid grid-cols-3 items-center bg-green-400 ">
      <li className=" flex-grow text-xl">{formatDate}</li>
      <li className="flex-grow text-xl">{amount}円</li>
      <button className="block p-4 text-xl" onClick={handleCLick}>
        delete
      </button>
    </div>
  );
};

export default IncomeList;
