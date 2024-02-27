import { useAppSelector } from "../../store/slice/Hooks/hooks";

import IncomeList from "./List/incomeList";
import ExpenseList from "./List/expenseList";

const Table = () => {
  const { expense, incomes } = useAppSelector((state) => state.finance);
  return (
    <section className="grid grid-cols-1 gap-7 md:grid-cols-2 ">
      <div className=" rounded-md border-2 border-primary-color bg-white p-3 ">
        <h2 className=" py-3 text-2xl font-bold text-primary-color">収入</h2>
        <ul className="">
          {incomes.map((income) => (
            <IncomeList key={income.id} {...income} />
          ))}
        </ul>
      </div>
      <div className="rounded-md border-2 border-orange-500 bg-white p-3 shadow-sm">
        <h2 className="py-3 text-2xl font-bold text-orange-500">支出</h2>
        <ul>
          {expense.map((expense) => (
            <ExpenseList key={expense.id} {...expense} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Table;
