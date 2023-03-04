import styles from "./BudgetList.module.scss";

const BudgetList = () => {
  return (
    <div className={styles.budgetList}>
      <div className={styles.budgetBox}>
        <div className={styles.budgetDetails}>
          <h3>budgetName</h3>
          <span>$200 / $1000</span>
        </div>
        <progress className={styles.progressBar} value="30" max="100" />
        <div className={styles.BtnBox}>
          <button className={styles.addBtn}>Add Expense</button>
          <button className={styles.viewBtn}>View Expense</button>
        </div>
      </div>

      
    </div>
  );
};

export default BudgetList;
