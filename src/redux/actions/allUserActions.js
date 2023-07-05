export const ALL_USER_FETCH = "ALL_USER_FETCH";
export const ALL_USER_CLEAR = "ALL_USER_CLEAR";

export const allUserFetch = (users) => ({
  type: ALL_USER_FETCH,
  payload: users,
});

export const allUserClear = () => ({
  type: ALL_USER_CLEAR,
});
