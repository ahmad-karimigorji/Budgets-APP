import {combineReducers} from "redux";
import budgetReducer from "./budget/budgetReducer";
import expenseReducer from "./expense/expenseReducer";

const combineReducer = combineReducers;

const reducer = combineReducer({
  budget: budgetReducer,
  expense: expenseReducer,
});

export default reducer;
