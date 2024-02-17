import ExpenceInputForm from "../../../components/Form/IncomeInputForm";
import IncomeInputForm from "../../../components/Form/ExpenseInputForm";
const Transactions = () => {
  return (
    <section className=" bg-slate-600">
      <div className="my-9 flex flex-col items-center justify-center  gap-6 py-10">
        <ExpenceInputForm />
        <IncomeInputForm />
      </div>
    </section>
  );
};

export default Transactions;
