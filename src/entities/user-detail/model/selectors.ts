const getUserDetailsStatus = (state: RootState) => state.userDetail.userDetails.status;

const getUserDetails = (state: RootState) => state.userDetail.userDetails.data;

export {
  getUserDetailsStatus,
  getUserDetails,
};
