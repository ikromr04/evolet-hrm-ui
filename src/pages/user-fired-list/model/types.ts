import { Departments } from '@/entities/department';
import { Positions } from '@/entities/position';
import { Profile } from '@/entities/profile';
import { Roles } from '@/entities/role';

type UserFiredFilter = {
  keyword: string;
  name: string;
  email: string;
  sex: string;
  nationality: string;
  citizenship: string;
  address: string;
  tel: string;
  familyStatus: string;
  children: number[] | string;
  startedWorkAt: string;
  roles: string[];
  positions: string[];
  departments: string[];
};

type UserFiredRow = {
  id: string;
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
  firedBy?: string;
  firedReason?: string;
  firedAt?: string;

  profile: Profile | null;
  roles: Roles;
  positions: Positions;
  departments: Departments;
};

export type {
  UserFiredFilter,
  UserFiredRow,
};
