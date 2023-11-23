// rootReducer.js
import { combineReducers } from "redux";
import modalPostReducer from "./modalPostReducer";
import modalMediaFileReducer from "./modalMediaFileReducer";
import modalPostShareReducer from "./modalPostShareReducer";
const rootReducer = combineReducers({
  modalPost: modalPostReducer,
  modalMedia: modalMediaFileReducer,
  modalPostShare: modalPostShareReducer
});

export default rootReducer;
