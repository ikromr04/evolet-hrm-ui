type CheckAuthResponse = {
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
      deletedAt: string;
    };
    relationships: {
      profile: {
        data: { type: 'profiles'; id: string; } | null;
      };
      roles: {
        data: { type: 'roles'; id: string; }[];
      };
      positions: {
        data: { type: 'positions'; id: string; }[];
      };
      departments: {
        data: { type: 'departments'; id: string; }[];
      };
      languages: {
        data: { type: 'languages'; id: string; }[];
      };
      equipments: {
        data: { type: 'equipments'; id: string; }[];
      };
      experiences: {
        data: { type: 'experiences'; id: string; }[];
      };
      educations: {
        data: { type: 'educations'; id: string; }[];
      };
    };
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

type LoginResponse = {
  data: {
    type: 'tokens';
    id: string;
    attributes: {
      token: string;
    }
  };
};

export type {
  CheckAuthResponse,
  LoginRequest,
  LoginResponse,
};
