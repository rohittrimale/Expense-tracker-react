import React, { useContext, useEffect, useState } from "react";
import ExpenseCart from "./ExpenseCart";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { MdCurrencyRupee } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../store/expenseSlice";
import Loader from "./Loader";
import DownloadButton from "./DownloadButton";

const ExpenseList = () => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { expenses, loading, error, totalExpense } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      dispatch(fetchExpenses(user.email));
    }
  }, [user, dispatch]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <div>Error fetching expenses: {error}</div>;

  return (
    <div className="mt-6 mx-auto text-white">
      {totalExpense ? (
        <div>
          <div className="grid grid-cols-12 md:grid-cols-12 justify-between bg-gray-800 px-3 items-center font-bold py-2">
            <div className="col-span-2 md:col-span-2"> Name</div>

            <div className="col-span-4  md:col-span-3"> Description</div>

            <div className="col-span-3 md:col-span-3"> Category</div>
            <div className="text-lg -ml-0.5 col-span-2 md:col-span-2">
              Price
            </div>
            <div className=" gap-3 md:col-span-1 md:flex hidden">
              <div>Edit</div>
              <div>Delete</div>
            </div>
            <div className="  col-span-1 md:hidden ">Action</div>
          </div>

          <div>
            {expenses.map((expense) => {
              return (
                <ExpenseCart
                  userEmail={email}
                  key={expense.id}
                  expense={expense}
                  id={expense.id}
                />
              );
            })}
          </div>

          <div className="flex justify-end items-center text-2xl bg-gray-800 px-3 font-bold py-3">
            <div className="text-xl">Total Expense : </div>
            <div className="mr-24 flex items-center">
              <MdCurrencyRupee />
              {totalExpense}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-xl font-bold bg-green-700 py-2 p-3 text-center">
          You didnt added any Expenses till now{" "}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
