const getUsersStatus = (state: RootState) => state.user.users.status;

const getUsers = (state: RootState) => state.user.users.data;

const getFiredUsersStatus = (state: RootState) => state.user.firedUsers.status;

const getFiredUsers = (state: RootState) => state.user.firedUsers.data;

export {
  getUsersStatus,
  getUsers,
  getFiredUsersStatus,
  getFiredUsers,
};
