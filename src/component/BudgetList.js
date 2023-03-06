import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BudgetList.module.scss";
import { HiOutlineTrash } from "react-icons/hi";
import { deleteExpense } from "../redux/expense/expenseActions";

const BudgetList = () => {
  const { budgets } = useSelector((state) => state.budget);
  return (
    <div className={styles.budgetList}>
      {budgets.map((item) => (
        <BudgetComponent key={item.id} budget={item} />
      ))}
    </div>
  );
};

export default BudgetList;

const BudgetComponent = ({ budget }) => {
  const { expense } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isView, setIsView] = useState(false);

  const deleteHandler = (expense) => {
    dispatch(deleteExpense(expense))
    filteredExpense.length === 0 && setIsView(false)
  }

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
        <span>
          ${expenseTotal} / ${budget.amount}
        </span>
      </div>
      <progress
        className={styles.progressBar}
        value={expenseTotal}
        max={budget.amount}
      ></progress>
      <div className={styles.BtnBox}>
        <button className={styles.addBtn}>Add Expense</button>
        <button
          className={styles.viewBtn}
          onClick={() => filteredExpense.length > 0 && setIsView(!isView)}
        >
          View Expense
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
                  onClick={() => deleteHandler(item)}
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
