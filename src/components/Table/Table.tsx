import { useAppSelector } from "../../store/slice/Hooks/hooks";
import IncomeList from "./List/incomeList";
import ExpenseList from "./List/expenseList";

const Table = () => {
  const { expense, incomes } = useAppSelector((state) => state.finance);
  return (
    <section className="grid grid-cols-2 gap-7 ">
      <div className="border-primary-color rounded-sm border-2 bg-white p-3 shadow-sm">
        <h2 className=" py-3 text-3xl">収入</h2>
        <ul className="">
          {incomes.map((income) => (
            <IncomeList key={income.id} {...income} />
          ))}
        </ul>
      </div>
      <div className="border-primary-color rounded-sm border-2 bg-white p-3 shadow-sm">
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
