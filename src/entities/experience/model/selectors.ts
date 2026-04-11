const getExperiencesStatus = (state: RootState) => state.experience.experiences.status;

const getExperiences = (state: RootState) => state.experience.experiences.data;

export {
  getExperiencesStatus,
  getExperiences,
};
