import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBudget } from "../redux/budget/budgetActions";
import { addExpense } from "../redux/expense/expenseActions";
import styles from "./OverViewComponent.module.scss";

const OverViewComponent = ({ isExpenseForm, setIsExpenseForm }) => {
  const [isBudgetForm, setIsBudgetForm] = useState(false);

  const budgetFormHandler = () => {
    setIsBudgetForm(!isBudgetForm);
    setIsExpenseForm(false);
  };
  const expenseFormHandler = () => {
    setIsExpenseForm(!isExpenseForm);
    setIsBudgetForm(false);
  };
  return (
    <div className={styles.overView}>
      <div className={styles.overViewHeader}>
        <h2>Budgets</h2>
        <div>
          <button className={styles.budgetBtn} onClick={budgetFormHandler}>
            Add Budget
          </button>
          <button className={styles.expenseBtn} onClick={expenseFormHandler}>
            Add Expense
          </button>
        </div>
      </div>
      {isBudgetForm && <BudgetForm setIsBudgetForm={setIsBudgetForm} />}
      {isExpenseForm && <ExpenseForm setIsExpenseForm={setIsExpenseForm} />}
    </div>
  );
};

export default OverViewComponent;

const BudgetForm = ({ setIsBudgetForm }) => {

  const [formValue, setFormValue] = useState({ budgetName: "", amount: "" });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const changeHandler = ({ target }) => {
    setError(false);

    const { name, value } = target;
    setFormValue({ ...formValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !formValue.budgetName.trim() ||
      parseInt(formValue.amount.charAt()) < 1
    ) {
      setError(true);
      return;
    }
    // console.log(formValue);
    const data = {
      ...formValue,
      amount: parseInt(formValue.amount),
      id: new Date().getTime(),
      creatAt: new Date().toISOString(),
    };
    dispatch(addBudget(data));
    setFormValue({ budgetName: "", amount: "" });
    setIsBudgetForm(false);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
        <label>Budget Name</label>
        <input
          type="text"
          name="budgetName"
          value={formValue.budgetName}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Budget Value</label>
        <input
          type="number"
          min={1}
          name="amount"
          value={formValue.amount}
          onChange={changeHandler}
        />
      </div>
      {error && <p className={styles.error}>Enter Valid Data !!</p>}
      <div className={styles.formBtnBox}>
        <button type="submit" className={styles.addBtn}>
          Add Budget
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setIsBudgetForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};


const ExpenseForm = ({ setIsExpenseForm }) => {
  
  const dispatch = useDispatch();
  const { budgets } = useSelector((state) => state.budget);
  const [formValue, setFormValue] = useState({
    category: "",
    description: "",
    cost: "",
  });
  const [error, setError] = useState(false);
  const changeHandler = ({ target }) => {
    setError(false);

    const { name, value } = target;
    setFormValue({ ...formValue, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formValue.category.trim() || !formValue.category.trim() || parseInt(formValue.cost.charAt()) < 1) {
      setError(true);
      return;
    }
    // console.log(formValue);
    const data = {
      ...formValue,
      cost: parseInt(formValue.cost),
      category: parseInt(formValue.category),
      id: new Date().getTime(),
      creatAt: new Date().toISOString(),
    };
    dispatch(addExpense(data));
    setFormValue({ category: "", description: "", cost: "" });
    setIsExpenseForm(false)
  };
  if (!budgets.length) {
    return <h3 className={styles.warning}>Enter new budget !!</h3>;
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
        <label>Expense Category</label>
        <select
          name="category"
          value={formValue.category}
          onChange={changeHandler}
        >
          <option value="">Select category</option>
          {budgets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.budgetName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={formValue.description}
          name="description"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>Expense Value</label>
        <input
          type="number"
          min={1}
          value={formValue.cost}
          name="cost"
          onChange={changeHandler}
        />
      </div>
      {error && <p className={styles.error}>Enter Valid Data !!</p>}
      <div className={styles.formBtnBox}>
        <button type="submit" className={styles.addBtn}>
          Add Expense
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setIsExpenseForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};