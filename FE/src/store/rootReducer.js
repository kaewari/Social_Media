// rootReducer.js
import { combineReducers } from "redux";
import modalPostReducer from "./modalPostReducer";

const rootReducer = combineReducers({
  modal: modalPostReducer,
  // add other reducers as needed
});

export default rootReducer;
