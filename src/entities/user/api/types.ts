import { Department } from '@/entities/department';
import { Education } from '@/entities/education';
import { Equipment } from '@/entities/equipment';
import { Experience } from '@/entities/experience';
import { Language } from '@/entities/language';
import { Position } from '@/entities/position';
import { Profile } from '@/entities/profile';
import { Role } from '@/entities/role';

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
  };
  relationships: {
    profile: {
      data: {
        type: 'profiles';
        id: string;
      };
    };
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
    languages: {
      data: {
        type: 'languages';
        id: string;
      }[];
    };
    equipments: {
      data: {
        type: 'equipments';
        id: string;
      }[];
    };
    experiences: {
      data: {
        type: 'experiences';
        id: string;
      }[];
    };
    educations: {
      data: {
        type: 'educations';
        id: string;
      }[];
    };
  };
};

type Included =
  | { type: 'profile'; id: string; attributes: Omit<Profile, 'id'> }
  | { type: 'roles'; id: string; attributes: Omit<Role, 'id'> }
  | { type: 'positions'; id: string; attributes: Omit<Position, 'id'> }
  | { type: 'departments'; id: string; attributes: Omit<Department, 'id'> }
  | { type: 'languages'; id: string; attributes: Omit<Language, 'id'> }
  | { type: 'equipments'; id: string; attributes: Omit<Equipment, 'id'> }
  | { type: 'experiences'; id: string; attributes: Omit<Experience, 'id'> }
  | { type: 'educations'; id: string; attributes: Omit<Education, 'id'> }

type UserResponse = {
  data: Data;
  included: Included[];
};

type UsersResponse = {
  data: Data[];
  included: Included[];
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
  TokenResponse,
  LoginRequest,
  UserStoreRequest,
  UserUpdateRequest,
};
