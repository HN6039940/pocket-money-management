import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { useAppSelector } from "../../store/slice/Hooks/hooks";
import { setFinanceData } from "../../firebase/firestore/firestore-financeData-operations";
import { formattedDateByja } from "../../utils/format";

const incomeSchema = z
  .object({
    income: z.coerce
      .number()
      .positive({ message: "収入は正の数を入力してください" }),
    date: z.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "日付を入力してください"
            : defaultError,
      }),
    }),
  })
  .refine(
    (data) =>
      new Date(formattedDateByja(data.date)) <=
      new Date(formattedDateByja(new Date())),
    {
      message: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}以前の日付を入力してください`,
      path: ["date"],
    },
  );

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
      await setFinanceData(submitData);
      reset();
    } catch (error) {
      reset();
    }
  };

  return (
    <div className=" w-1/2 min-w-60   max-w-2xl flex-col  gap-4 rounded-md border-2 border-primary-color bg-tertiary-color p-3">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="income" className=" text-lg">
            収入
          </label>
          <input
            type="number"
            id="income"
            className="min-h-10  w-full rounded-sm border-2 border-gray-400"
            {...register("income", {
              required: "収入を入力してください",
            })}
          />
          {errors.income && (
            <p className="text-sm font-bold text-red-500">
              {errors.income.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="income" className="text-lg">
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
            <p className="text-sm font-bold  text-red-500">
              {errors.date.message}
            </p>
          )}
        </div>
        <div className=" text-center">
          <input
            className="hover:bg-primary-dark-color inline-block cursor-pointer  rounded-sm  border-2 border-gray-700 bg-primary-color  p-3 font-bold text-gray-800 transition-all duration-300 ease-in-out hover:text-white"
            type="submit"
            value="記録する"
          />
        </div>
      </form>
    </div>
  );
};

export default IncomeInputForm;
