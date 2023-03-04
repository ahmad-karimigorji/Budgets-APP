import { ADD_EXPENSE } from "./expenseTypes";

export const addExpense = (expense) => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};
