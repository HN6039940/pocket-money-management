import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../store/slice/Hooks/hooks";
import { setFinanceData } from "../../firebase/firestore/firestore-financeData-operations";
import { formattedDateByja } from "../../utils/format";

const expenseSchema = z
  .object({
    expense: z.coerce
      .number()
      .positive({ message: "支出は正の数を入力してください" }),
    date: z.date(),
    label: z.string().min(1, { message: "1文字以上入力してください" }),
  })
  .refine(
    (data) =>
      new Date(formattedDateByja(data.date)) <=
      new Date(formattedDateByja(new Date())),
    {
      message: `当日以降の日付は使えません`,
      path: ["date"],
    },
  );

type expenseInput = z.infer<typeof expenseSchema>;

const ExpenseInputForm = () => {
  const { id } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<expenseInput>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit: SubmitHandler<expenseInput> = async (data) => {
    try {
      const submitData = {
        amount: data.expense,
        date: data.date,
        label: data.label,
        id: uuidv4(),
        useruid: id,
      };
      await setFinanceData(submitData);
      console.log(submitData);
      reset();
    } catch (error) {
      console.log(error);
      reset();
    }
  };

  return (
    <div className=" bg-quaternary-color  w-1/2 min-w-60 max-w-2xl rounded-md border-2 border-black p-3 ">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="expense" className="text-lg">
            支出
          </label>
          <input
            type="number"
            id="expense"
            className="min-h-10 w-full rounded-sm"
            {...register("expense", {
              required: "支出を入力してください",
            })}
          />
          {errors.expense && (
            <p className="text-sm text-red-500">{errors.expense.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="expense" className="text-lg">
            日付
          </label>
          <input
            type="date"
            id="expense"
            className="min-h-10 w-full rounded-sm"
            {...register("date", {
              required: "日付を入力してください",
              valueAsDate: true,
            })}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="expense" className="text-lg">
            種類
          </label>
          <input
            type="text"
            id="expense"
            className="min-h-10 w-full rounded-sm"
            placeholder="食費"
            {...register("label", {
              required: "入力してください",
            })}
          />
          {errors.label && (
            <p className="text-sm text-red-500">{errors.label.message}</p>
          )}
        </div>
        <div className="text-center">
          <input
            className=" border-primary-color bg-primary-color inline-block cursor-pointer rounded-sm border-2 p-3 text-white"
            type="submit"
            value="送信する"
          />
        </div>
      </form>
    </div>
  );
};

export default ExpenseInputForm;
