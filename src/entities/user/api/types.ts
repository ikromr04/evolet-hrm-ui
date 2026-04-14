type UserResponse = {
  data: {
    type: 'users';
    id: string;
    attributes: {
      name: string;
      surname: string;
      patronymic: string | null;
      avatar: string | null;
      avatarThumb: string | null;
      email: string;
      emailVerifiedAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
    relationships: {
      roles: {
        data: {
          type: 'roles';
          id: string;
        }[];
      };
      positions: {
        data: {
          type: 'positions';
          id: string;
        }[];
      };
      departments: {
        data: {
          type: 'departments';
          id: string;
        }[];
      };
    };
  };
};

type UsersResponse = {
  data: {
    type: 'users';
    id: string;
    attributes: {
      name: string;
      surname: string;
      patronymic: string | null;
      avatar: string | null;
      avatarThumb: string | null;
      email: string;
      emailVerifiedAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
    relationships: {
      roles: {
        data: {
          type: 'roles';
          id: string;
        }[];
      };
      positions: {
        data: {
          type: 'positions';
          id: string;
        }[];
      };
      departments: {
        data: {
          type: 'departments';
          id: string;
        }[];
      };
    };
  }[];
};

type TokenResponse = {
  data: {
    type: 'tokens';
    id: string;
    attributes: {
      token: string;
    }
  };
};

type LoginRequest = {
  data: {
    type: 'tokens';
    attributes: {
      email: string;
      password: string;
    }
  };
};

type UserStoreRequest = {
  data: {
    type: 'users';
    attributes: {
      name: string;
      surname: string;
      patronymic?: string;
      email: string;
      avatar?: File;
      password?: string;
      password_confirmation?: string;
    };
  };
};

type UserUpdateRequest = {
  data: {
    type: 'users';
    id: string;
    attributes?: {
      name?: string;
      surname?: string;
      patronymic?: string;
      email?: string;
      avatar?: File;
      password?: string;
      password_confirmation?: string;
    };
    relationships?: {
      roles?: {
        data: { type: 'roles'; id: string; }[];
      };
      positions?: {
        data: { type: 'positions'; id: string; }[];
      };
      departments?: {
        data: { type: 'departments'; id: string; }[];
      };
      languages?: {
        data: { type: 'languages'; id: string; }[];
      };
    }
  };
};

export type {
  UserResponse,
  UsersResponse,
  TokenResponse,
  LoginRequest,
  UserStoreRequest,
  UserUpdateRequest,
};
