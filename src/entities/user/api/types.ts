type UserResponse = {
  data: {
    type: 'users';
    id: string;
    attributes: {
      name: string;
      surname: string;
      patronymic: string;
      avatar: string;
      avatarThumb: string;
      email: string | null;
      emailVerifiedAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
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
  TokenResponse,
  LoginRequest,
  UserStoreRequest,
  UserUpdateRequest,
};
