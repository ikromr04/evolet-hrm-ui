const getEducationsStatus = (state: RootState) => state.education.educations.status;

const getEducations = (state: RootState) => state.education.educations.data;

export {
  getEducationsStatus,
  getEducations,
};
