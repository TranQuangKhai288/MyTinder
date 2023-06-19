import { legacy_createStore as createStore } from "redux";
import userReducer from "./reducers/userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
