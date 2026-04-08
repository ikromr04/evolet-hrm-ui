const UserApiRoutes = {
  Check: '/me',
  Login: '/login',
  Logout: '/logout',
  Index: '/users',
  Avatar: (id: string) => `/users/${id}/avatar`,
};

export { UserApiRoutes };
