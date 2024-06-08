import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import axios from "axios";

const ExpenseCart = ({ expense, id, userEmail }) => {
  const { expenseName, expensePrice, expenseDescription, expenseCategory } =
    expense;


  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleDelete = () => {
    axios
      .delete(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}/${id}.json`
      )
      .then((response) => {
        console.log("Expense successfully deleted");
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios
      .put(
        `https://satiya-585fe-default-rtdb.firebaseio.com/expenses/${userEmail}/${id}.json`,
        editedExpense
      )
      .then((response) => {
        console.log("Expense successfully updated");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (
    !expenseName ||
    !expensePrice ||
    !expenseDescription ||
    !expenseCategory
  ) {
    return null; // If any expense detail is empty, don't render the component
  }

  return (
    <div className="">
      {isEditing ? (
        <div className="grid grid-cols-7 gap-x-5 justify-center bg-slate-200 px-3 items-center font-bold py-2 text-black">
          <div>
            <input
              type="text"
              name="expenseName"
              value={editedExpense.expenseName}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="expenseDescription"
              value={editedExpense.expenseDescription}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="expenseCategory"
              value={editedExpense.expenseCategory}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-center">
            <MdCurrencyRupee />
            <input
              type="text"
              name="expensePrice"
              value={editedExpense.expensePrice}
              onChange={handleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="border border-black grid grid-cols-6 justify-center bg-slate-200 px-3 items-center font-bold py-2 text-black">
          <div>{expenseName}</div>
          <div>{expenseDescription}</div>
          <div>{expenseCategory}</div>
          <div className="flex items-center">
            <MdCurrencyRupee />
            <div>{expensePrice}</div>
          </div>
          <button
            type="button"
            onClick={handleEdit}
            class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            class="text-white bg-gradient-to-r py-1.5 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 text-center me-2 mb-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseCart;
