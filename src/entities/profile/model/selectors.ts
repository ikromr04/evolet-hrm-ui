const getProfilesStatus = (state: RootState) => state.profile.profiles.status;

const getProfiles = (state: RootState) => state.profile.profiles.data;

export {
  getProfilesStatus,
  getProfiles,
};
