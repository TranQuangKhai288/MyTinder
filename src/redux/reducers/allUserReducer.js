import { ALL_USER_FETCH, ALL_USER_CLEAR } from "../actions/allUserActions";

const allUserInitialState = {
  allUser: [],
};

const allUserReducer = (state = allUserInitialState, action) => {
  switch (action.type) {
    case ALL_USER_FETCH:
      return {
        ...state,
        allUser: action.payload,
      };
    case ALL_USER_CLEAR:
      return {
        ...state,
        allUser: allUserInitialState.allUser,
      };
    default:
      return state;
  }
};

export default allUserReducer;
