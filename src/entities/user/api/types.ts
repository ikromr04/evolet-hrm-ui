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
      email?: string | null;
      emailVerifiedAt?: string | null;
      createdAt?: string;
      updatedAt?: string;
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
      password?: string;
      password_confirmation?: string;
    };
  };
};

export type {
  UserResponse,
  TokenResponse,
  LoginRequest,
  UserStoreRequest,
};
