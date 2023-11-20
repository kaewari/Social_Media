// rootReducer.js
import { combineReducers } from "redux";
import modalPostReducer from "./modalPostReducer";
import modalMediaFileReducer from "./modalMediaFileReducer";
const rootReducer = combineReducers({
  modalPost: modalPostReducer,
  modalMedia: modalMediaFileReducer,
});

export default rootReducer;
