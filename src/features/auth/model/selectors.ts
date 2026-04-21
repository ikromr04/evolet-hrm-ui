const getAuthStatus = (state: RootState) => state.auth.status;

const getMe = (state: RootState) => state.auth.me;

export {
  getAuthStatus,
  getMe,
};
