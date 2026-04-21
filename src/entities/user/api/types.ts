type Data = {
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
    deletedAt: string | null;
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

type UserResponse = {
  data: Data;
};

type UsersResponse = {
  data: Data[];
};

type UserStoreRequest = {
  data: {
    type: 'users';
    attributes: {
      name: string;
      surname: string;
      patronymic?: string | null;
      email: string;
      avatar?: File | null;
      password?: string;
      password_confirmation?: string;
    };
    relationships?: {
      profile?: {
        data: { type: 'profiles'; id: string; } | null;
      };
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
      equipments?: {
        data: { type: 'equipments'; id: string; }[];
      };
      experiences?: {
        data: { type: 'experiences'; id: string; }[];
      };
      educations?: {
        data: { type: 'educations'; id: string; }[];
      };
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
      avatar?: File | null;
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
  UserStoreRequest,
  UserUpdateRequest,
};
