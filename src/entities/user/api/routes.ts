const UserApiRoutes = {
  Check: '/me',
  Login: '/login',
  Logout: '/logout',
  Users: '/users',
  Avatar: (id: string) => `/users/${id}/avatar`,
};

export { UserApiRoutes };
