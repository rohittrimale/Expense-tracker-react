import React, { useContext, useEffect, useState } from "react";
import ExpenseCart from "./ExpenseCart";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../store/expenseSlice";
import Loader from "./Loader";

const ExpenseList = () => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { expenses, loading, error } = useSelector((state) => state.expenses);


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
    <div className="mt-6 mx-auto">
      <div className="grid grid-cols-6 justify-between bg-slate-700 px-3 items-center font-bold py-2 text-white">
        <div>Expense Name</div>

        <div>Expense Description</div>

        <div>Expense Category</div>
        <div className="flex items-center  ">
          <div className="text-lg -ml-0.5">Expense Price</div>
        </div>
        <div>Edit</div>
        <div>Delete</div>
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

      {/* {Object.keys(expenses).map((userId) => {
        console.log(userId);
        return Object.keys(expenses[userId]).map((expenseId) => {
          console.log(expenseId);
          return (
            <ExpenseCart
              userEmail={email.substring(0, email.indexOf("@"))}
              key={expenseId}
              expense={expenses[userId][expenseId]}
              id={expenseId}
            />
          );
        });
      })} */}
    </div>
  );
};

export default ExpenseList;
