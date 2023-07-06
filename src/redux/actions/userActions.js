export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_UPDATE_STATE = "USER_UPDATE_STATE";
export const USER_UPDATE_EMAIL = "USER_UPDATE_EMAIL";
export const USER_UPDATE_AVATAR = "USER_UPDATE_AVATAR";
export const USER_UPDATE_FIRST_NAME = "USER_UPDATE_FIRST_NAME";
export const USER_UPDATE_LAST_NAME = "USER_UPDATE_LAST_NAME";
export const USER_UPDATE_OCCUPATION = "USER_UPDATE_OCCUPATION";
export const USER_UPDATE_ABOUT_ME = "USER_UPDATE_ABOUT_ME";
export const USER_UPDATE_BIRTHDAY = "USER_UPDATE_BIRTHDAY";
export const USER_UPDATE_GENDER = "USER_UPDATE_GENDER";
export const USER_UPDATE_INTERESTS = "USER_UPDATE_INTERESTS";
export const USER_UPDATE_IS_VERIFIED = "USER_UPDATE_IS_VERIFIED";
export const USER_UPDATE_IS_SET_UP = "USER_UPDATE_IS_SET_UP";
export const USER_ADD_CHATS = "USER_ADD_CHATS";

export const userLogin = () => ({
  type: USER_LOGIN,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userUpdateState = (user) => ({
  type: USER_UPDATE_STATE,
  payload: user,
});

export const userUpdateEmail = (email) => ({
  type: USER_UPDATE_EMAIL,
  payload: email,
});

export const userUpdateAvatar = (avatar) => ({
  type: USER_UPDATE_AVATAR,
  payload: avatar,
});

export const userUpdateFirstName = (firstName) => ({
  type: USER_UPDATE_FIRST_NAME,
  payload: firstName,
});

export const userUpdateLastName = (lastName) => ({
  type: USER_UPDATE_LAST_NAME,
  payload: lastName,
});

export const userUpdateOccupation = (occupation) => ({
  type: USER_UPDATE_OCCUPATION,
  payload: occupation,
});

export const userUpdateAboutMe = (aboutMe) => ({
  type: USER_UPDATE_ABOUT_ME,
  payload: aboutMe,
});

export const userUpdateBirthday = (birthday) => ({
  type: USER_UPDATE_BIRTHDAY,
  payload: birthday,
});

export const userUpdateGender = (gender) => ({
  type: USER_UPDATE_GENDER,
  payload: gender,
});

export const userUpdateInterests = (interests) => ({
  type: USER_UPDATE_INTERESTS,
  payload: interests,
});

export const userUpdateIsVerified = (isVerified) => ({
  type: USER_UPDATE_IS_VERIFIED,
  payload: isVerified,
});

export const userUpdateIsSetUp = (isSetUp) => ({
  type: USER_UPDATE_IS_SET_UP,
  payload: isSetUp,
});

export const userAddChats = (chat) => ({
  type: USER_ADD_CHATS,
  payload: chat,
});
