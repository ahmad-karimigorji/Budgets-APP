import { ADD_BUDGET, DELETE_BUDGET } from "./budgetTypes";

const initialBudgetState = {
  budgets: [],
  total: 0,
};

const budgetReducer = (state = initialBudgetState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_BUDGET:
      const newBudgets = [...state.budgets];
      newBudgets.unshift(payload);
      return {
        ...state,
        budgets: newBudgets,
        total: state.total + parseInt(payload.amount),
      };
    case DELETE_BUDGET:
      const filtered = state.budgets.filter((item) => item.id !== payload.id);
      return {
        ...state,
        budgets: filtered,
        total: state.total - parseInt(payload.amount),
      };

    default:
      return state;
  }
};
export default budgetReducer;
