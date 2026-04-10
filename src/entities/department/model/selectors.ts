const getDepartmentsStatus = (state: RootState) => state.department.departments.status;

const getDepartments = (state: RootState) => state.department.departments.data;

export {
  getDepartmentsStatus,
  getDepartments,
};
