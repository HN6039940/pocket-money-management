import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../store/slice/Hooks/hooks";
import { setFinanceData } from "../../firebase/firestore/firestore-financeData-operations";

const incomeSchema = z
  .object({
    income: z.coerce
      .number()
      .positive({ message: "収入は正の数を入力してください" }),
    date: z.date(),
  })
  .refine((data) => data.date <= new Date(), {
    message: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}以前の日付を入力してください`,
    path: ["date"],
  });

type incomeInput = z.infer<typeof incomeSchema>;

const IncomeInputForm = () => {
  const { id } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<incomeInput>({
    resolver: zodResolver(incomeSchema),
  });

  const onSubmit: SubmitHandler<incomeInput> = async (data) => {
    try {
      const submitData = {
        amount: data.income,
        date: data.date,
        id: uuidv4(),
        useruid: id,
      };
      console.log(submitData);
      await setFinanceData(submitData);
      reset();
    } catch (error) {
      console.log(error);
      reset();
    }
  };

  return (
    <div className=" min-w-60 max-w-2xl rounded-sm bg-yellow-400 p-3">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="income" className="">
            収入
          </label>
          <input
            type="number"
            id="income"
            className="min-h-10  w-full rounded-sm"
            {...register("income", {
              required: "収入を入力してください",
            })}
          />
          {errors.income && (
            <p className="text-sm text-red-500">{errors.income.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="income" className="">
            日付
          </label>
          <input
            type="date"
            id="income"
            className="min-h-10  w-full rounded-sm"
            {...register("date", {
              required: "日付を入力してください",
              valueAsDate: true,
            })}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>
        <input type="submit" value="送信する" />
      </form>
    </div>
  );
};

export default IncomeInputForm;
