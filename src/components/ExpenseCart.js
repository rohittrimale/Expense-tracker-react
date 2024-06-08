import React from "react";
import { MdCurrencyRupee } from "react-icons/md";

const ExpenseCart = ({ expense }) => {
  const { expenseName, expensePrice, expenseDescription, expenseCategory } =
    expense;
  return (
    <div className="">
      {expensePrice && (
        <div className="grid grid-cols-4 justify-center  bg-slate-200 px-3 items-center font-bold py-2 text-black">
          <div>{expenseName}</div>

          <div>{expenseDescription}</div>

          <div>{expenseCategory}</div>
          <div className="flex items-center  ">
            <MdCurrencyRupee />
            <div className="text-lg -ml-0.5">{expensePrice}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCart;
