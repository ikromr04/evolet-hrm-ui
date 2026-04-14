const getAuthStatus = (state: RootState) => state.user.status;

const getAuthUser = (state: RootState) => state.user.me;

const getUsersStatus = (state: RootState) => state.user.users.status;

const getUsers = (state: RootState) => state.user.users.data;

export {
  getAuthStatus,
  getAuthUser,
  getUsersStatus,
  getUsers,
};
