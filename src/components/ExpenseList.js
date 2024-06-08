import React from "react";
import ExpenseCart from "./ExpenseCart";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="mt-6 mx-auto">
      <div className="grid grid-cols-4 justify-between bg-slate-700 px-3 items-center font-bold py-2 text-white">
        <div>Expense Name</div>

        <div>Expense Description</div>

        <div>Expense Category</div>
        <div className="flex items-center  ">
          <div className="text-lg -ml-0.5">Expense Price</div>
        </div>
      </div>

      {expenses.map((expense) => {
        return <ExpenseCart expense={expense} />;
      })}
    </div>
  );
};

export default ExpenseList;
