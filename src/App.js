import { useState } from "react";
import { Provider } from "react-redux";
import "./App.scss";
import BudgetList from "./component/BudgetList";
import OverViewComponent from "./component/OverViewComponent";
import store from "./redux/store";
function App() {
  const [isExpenseForm, setIsExpenseForm] = useState(false);

  return (
    <Provider store={store}>
      <div className="container">
        <OverViewComponent
          isExpenseForm={isExpenseForm}
          setIsExpenseForm={setIsExpenseForm}
        />
        <BudgetList
          isExpenseForm={isExpenseForm}
          setIsExpenseForm={setIsExpenseForm}
        />
      </div>
    </Provider>
  );
}

export default App;
