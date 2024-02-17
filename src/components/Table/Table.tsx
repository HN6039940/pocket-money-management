import { useAppDispatch, useAppSelector } from "../../store/slice/Hooks/hooks";
import IncomeList from "./List/incomeList";
import ExpenseList from "./List/expenseList";

const Table = () => {
  const dispatch = useAppDispatch();
  const { expense, incomes } = useAppSelector((state) => state.finance);
  return (
    <section className="grid grid-cols-2 gap-7 bg-sky-500">
      <div className="p-3">
        <h2 className=" py-3 text-3xl">収入</h2>
        <ul className="">
          {incomes.map((income) => (
            <IncomeList key={income.id} {...income} />
          ))}
        </ul>
      </div>
      <div className="p-3">
        <h2 className="py-3 text-3xl">支出</h2>
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
