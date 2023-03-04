import { Provider } from "react-redux";
import "./App.scss";
import BudgetList from "./component/BudgetList";
import OverViewComponent from "./component/OverViewComponent";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <OverViewComponent />
        <BudgetList />
      </div>
    </Provider>
  );
}

export default App;
