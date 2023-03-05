import { ADD_EXPENSE } from "./expenseTypes";

const initialExpenseState = {
  expenses: [],
  total: 0,
};

const expenseReducer = (state = initialExpenseState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_EXPENSE:
      const newExpenses = [...state.expenses];
      newExpenses.unshift(payload);
      return {
        ...state,
        expenses: newExpenses,
        total: state.total + parseInt(payload.cost),
      };
    default:
      return state;
  }
};
export default expenseReducer;
