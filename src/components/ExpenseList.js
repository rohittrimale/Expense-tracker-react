import React, { useContext, useEffect, useState } from "react";
import ExpenseCart from "./ExpenseCart";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const ExpenseList = () => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
    fetchExpenses();
  }, [user]);
  console.log(expenses);

  const fetchExpenses = async () => {
    const userEmail = email.substring(0, email.indexOf("@"));

    try {
      const response = await axios.get(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}.json`
      );

      const data = response.data;
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({ id: key, ...data[key] });
      }
      console.log(loadedExpenses);
      setExpenses(loadedExpenses);
    } catch (error) {
      console.log("Eroor", error);
    }
  };

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

      {Object.keys(expenses).map((userId) =>
        Object.keys(expenses[userId]).map((expenseId) => (
          <ExpenseCart key={expenseId} expense={expenses[userId][expenseId]} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
