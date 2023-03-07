import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BudgetList.module.scss";
import { HiOutlineTrash } from "react-icons/hi";
import {
  deleteAllExpensesOfBudget,
  deleteExpense,
} from "../redux/expense/expenseActions";
import { deleteBudget } from "../redux/budget/budgetActions";

const BudgetList = ({ setIsExpenseForm, setIsBudgetForm }) => {
  const { budgets } = useSelector((state) => state.budget);
  return (
    <div className={styles.budgetList}>
      {budgets.map((item) => (
        <BudgetComponent
          key={item.id}
          budget={item}
          setIsExpenseForm={setIsExpenseForm}
          setIsBudgetForm={setIsBudgetForm}
        />
      ))}
    </div>
  );
};

export default BudgetList;

const BudgetComponent = ({ budget, setIsExpenseForm, setIsBudgetForm }) => {
  const { expense } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isView, setIsView] = useState(false);

  const deleteExpenseHandler = (expense) => {
    dispatch(deleteExpense(expense));
    // filteredExpense.length === 0 && setIsView(false);
    setIsView(false);
  };
  const deleteBudgetHandler = (budget) => {
    dispatch(deleteBudget(budget));
    dispatch(deleteAllExpensesOfBudget(budget.id));
    setIsView(false);
  };

  let expenseTotal = 0;
  const filteredExpense = expense.expenses.reduce((accu, curr) => {
    if (curr.category === budget.id) {
      expenseTotal += curr.cost;
      accu.push(curr);
    }
    return accu;
  }, []);

  return (
    <div key={budget.id} className={styles.budgetBox}>
      <div className={styles.budgetDetails}>
        <h3>{budget.budgetName}</h3>
        <div>
          <span
            className={`${
              expenseTotal >= budget.amount ? styles.expenseTotal : ""
            }`}
          >
            ${expenseTotal}
          </span>
          <span> / </span>
          <span className={styles.budgetAmount}>${budget.amount}</span>
        </div>
      </div>
      <progress
        className={`${styles.progressBar} ${
          expenseTotal >= budget.amount ? styles.fullProgress : ""
        }`}
        value={expenseTotal}
        max={budget.amount}
      ></progress>
      <div className={styles.BtnBox}>
        <button
          className={styles.addBtn}
          onClick={() => {
            setIsExpenseForm(true);
            setIsBudgetForm(false);
          }}
        >
          Add Expense
        </button>
        <button
          className={styles.viewBtn}
          onClick={() => filteredExpense.length > 0 && setIsView(!isView)}
        >
          View Expense
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteBudgetHandler(budget)}
        >
          Delete
        </button>
      </div>

      {isView && (
        <div className={styles.viewExpense}>
          {filteredExpense.map((item) => (
            <div key={item.id} className={styles.viewBox}>
              <div>
                <p>{item.description}</p>
                <span>${item.cost}</span>
              </div>
              <div>
                <span className={styles.date}>{`${new Date(
                  item.creatAt
                ).toLocaleString()}`}</span>
                <button
                  className={styles.iconBtn}
                  onClick={() => deleteExpenseHandler(item)}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
