import ExpenceInputForm from "../../../components/Form/IncomeInputForm";
import IncomeInputForm from "../../../components/Form/ExpenseInputForm";
const Transactions = () => {
  return (
    <section className=" mt-5 rounded-md border-2  border-primary-color bg-white">
      <div className="my-9 flex flex-col items-center justify-center  gap-6 py-10">
        <ExpenceInputForm />
        <IncomeInputForm />
      </div>
    </section>
  );
};

export default Transactions;
