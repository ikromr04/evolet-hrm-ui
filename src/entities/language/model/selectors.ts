const getLanguagesStatus = (state: RootState) => state.language.languages.status;

const getLanguages = (state: RootState) => state.language.languages.data;

export {
  getLanguagesStatus,
  getLanguages,
};
