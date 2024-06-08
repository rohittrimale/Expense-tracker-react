import React, { useContext, useEffect, useRef, useState } from "react";
import ExpenseList from "./ExpenseList";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const ExpenseForm = () => {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");

  const priceRef = useRef();
  const descriptionRef = useRef();
  const expenseNameRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [showExpense, setShowExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let enteredExpenseName = expenseNameRef.current.value;
    let enteredPrice = priceRef.current.value;
    let enteredDescription = descriptionRef.current.value;

    const expenseData = {
      expenseName: enteredExpenseName,
      expensePrice: enteredPrice,
      expenseDescription: enteredDescription,
      expenseCategory: selectedCategory,
    };

    if (email) {
      let userEmail = email.substring(0, email.indexOf("@"));
      console.log(userEmail);
      try {
        const response = await axios.post(
          `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}.json`,
          expenseData
        );
        setExpenses((prev) => [
          ...prev,
          { id: response.data.name, ...expenseData },
        ]);
      } catch (error) {
        console.error("Error saving expense: ", error);
      }
    }

    expenseNameRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const toggleAddExpense = () => {
    setShowExpense((prev) => !prev);
  };

  const cancelHandler = () => {
    setShowExpense(false);
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-5">
      <div className="font-bold text-lg mb-4">
        <button
          type="button"
          onClick={toggleAddExpense}
          className="relative inline-block text-lg group"
        >
          <span className="relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-3 py-2 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Add Expense</span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </button>
      </div>
      <div
        className={`transition-all duration-500 transform ${
          showExpense
            ? "opacity-100 max-h-screen"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div>
            <label
              htmlFor="expense-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expense Name
            </label>
            <input
              ref={expenseNameRef}
              type="text"
              id="expense-name"
              required
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="expense-description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expense Description
            </label>
            <input
              ref={descriptionRef}
              type="text"
              id="expense-description"
              required
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="expense-price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expense Price
            </label>
            <input
              ref={priceRef}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>

          <div className="">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Rent">Rent</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex mt-6 justify-center gap-6">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add Expense
          </button>

          <button
            onClick={cancelHandler}
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
