import { USER_LOGIN, USER_LOGOUT } from "../actions/userActions";

const userInitialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    avatar: null,
    isVerified: false,
    isLogin: false,
    docID: null,
    matches: [],
    beMatched: [],
    chats: [],
  },
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: userInitialState.user,
      };
    default:
      return state;
  }
};

export default userReducer;
