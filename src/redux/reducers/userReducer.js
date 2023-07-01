import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_UPDATE_STATE,
  USER_UPDATE_EMAIL,
  USER_UPDATE_AVATAR,
  USER_UPDATE_FIRST_NAME,
  USER_UPDATE_LAST_NAME,
  USER_UPDATE_BIRTHDAY,
  USER_UPDATE_GENDER,
  USER_UPDATE_INTERESTS,
  USER_UPDATE_IS_VERIFIED,
  USER_UPDATE_IS_SET_UP,
  updateGender,
} from "../actions/userActions";

const userInitialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    birthday: null,
    gender: null,
    interests: [],
    email: null,
    avatar: null,
    isVerified: false,
    isSetUp: false,
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
        user: {
          ...state.user,
          isLogin: true,
        },
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: userInitialState.user,
      };
    case USER_UPDATE_STATE:
      return {
        ...state,
        user: action.payload,
      };
    case USER_UPDATE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload,
        },
      };
    case USER_UPDATE_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    case USER_UPDATE_FIRST_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload,
        },
      };
    case USER_UPDATE_LAST_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          lastName: action.payload,
        },
      };
    case USER_UPDATE_BIRTHDAY:
      return {
        ...state,
        user: {
          ...state.user,
          birthday: action.payload,
        },
      };
    case USER_UPDATE_GENDER:
      return {
        ...state,
        user: {
          ...state.user,
          gender: action.payload,
        },
      };
    case USER_UPDATE_INTERESTS:
      return {
        ...state,
        user: {
          ...state.user,
          interests: action.payload,
        },
      };
    case USER_UPDATE_IS_VERIFIED:
      return {
        ...state,
        user: {
          ...state.user,
          isVerified: action.payload,
        },
      };
    case USER_UPDATE_IS_SET_UP:
      return {
        ...state,
        user: {
          ...state.user,
          isSetUp: action.payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
