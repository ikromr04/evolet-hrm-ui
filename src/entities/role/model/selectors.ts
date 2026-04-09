const getRolesStatus = (state: RootState) => state.role.roles.status;

const getRoles = (state: RootState) => state.role.roles.data;

export {
  getRolesStatus,
  getRoles,
};
