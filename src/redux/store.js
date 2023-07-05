import { legacy_createStore as createStore } from "redux";
import userReducer from "./reducers/userReducer";
import allUserReducer from "./reducers/allUserReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  allUser: allUserReducer,
});

const store = createStore(rootReducer);

export default store;
