import { Departments } from '@/entities/department';
import { Positions } from '@/entities/position';
import { Profile } from '@/entities/profile';
import { Roles } from '@/entities/role';

type UserTransferredFilter = {
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

type UserTransferredRow = {
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
  transferredBy?: string;
  transferredTo?: string;
  transferredAt?: string;

  profile: Profile | null;
  roles: Roles;
  positions: Positions;
  departments: Departments;
};

export type {
  UserTransferredFilter,
  UserTransferredRow,
};
