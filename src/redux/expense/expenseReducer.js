import {
  ADD_EXPENSE,
  DELETE_ALL_EXPENSES_OF_BUDGET,
  DELETE_EXPENSE,
} from "./expenseTypes";

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
        total: state.total + parseInt(payload.amount),
      };
    case DELETE_EXPENSE:
      const filtered = state.expenses.filter((item) => item.id !== payload.id);
      return {
        ...state,
        expenses: filtered,
        total: state.total - parseInt(payload.amount),
      };
    case DELETE_ALL_EXPENSES_OF_BUDGET: {
      let expenseTotal = 0;
      const filtered = state.expenses.reduce((accu, curr) => {
        if (curr.category !== payload) {
          expenseTotal += curr.amount;
          accu.push(curr);
        }
        return accu;
      }, []);
      return {
        ...state,
        expenses: filtered,
        total: expenseTotal,
      };
    }
    default:
      return state;
  }
};
export default expenseReducer;
