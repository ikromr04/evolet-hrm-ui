const getAuthStatus = (state: RootState) => state.user.status;

const getAuthUser = (state: RootState) => state.user.me;

export { getAuthStatus, getAuthUser };
