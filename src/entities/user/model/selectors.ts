const getUsersStatus = (state: RootState) => state.user.users.status;

const getUsers = (state: RootState) => state.user.users.data;

export {
  getUsersStatus,
  getUsers,
};
