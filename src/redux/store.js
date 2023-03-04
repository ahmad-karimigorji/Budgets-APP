import { legacy_createStore as createStore } from "redux";
import reducer from "./rootReducer";
import { applyMiddleware } from "redux";
import logger from "redux-logger";

const store = createStore(reducer, applyMiddleware(logger));
export default store;
