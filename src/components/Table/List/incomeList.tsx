import { type IncomesItem } from "../../../store/slice/financeSlice";
import { formattedDate } from "../../../utils/format";

const incomeList = (props: IncomesItem) => {
  const { id, date, amount } = props;
  const formatDate = formattedDate(date as string);
  return (
    <div className=" flex  items-center bg-green-400 ">
      <li className=" flex-grow text-xl">{formatDate}</li>
      <li className="flex-grow text-xl">{amount}円</li>
      <button className="block p-4 text-xl">delete</button>
    </div>
  );
};

export default incomeList;
