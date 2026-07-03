const getUsersStatus = (state: RootState) => state.user.users.status;

const getUsers = (state: RootState) => state.user.users.data;

const getFiredUsersStatus = (state: RootState) => state.user.firedUsers.status;

const getTransferredUsersStatus = (state: RootState) => state.user.transferredUsers.status;

const getFiredUsers = (state: RootState) => state.user.firedUsers.data;

const getTransferredUsers = (state: RootState) => state.user.transferredUsers.data;

export {
  getUsersStatus,
  getUsers,
  getFiredUsersStatus,
  getFiredUsers,
  getTransferredUsersStatus,
  getTransferredUsers,
};
