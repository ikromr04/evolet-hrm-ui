import { Departments } from '@/entities/department';
import { Educations } from '@/entities/education';
import { Equipments } from '@/entities/equipment';
import { Experiences } from '@/entities/experience';
import { Languages } from '@/entities/language';
import { Positions } from '@/entities/position';
import { Profile } from '@/entities/profile';
import { Roles } from '@/entities/role';

enum AuthStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN'
};

type User = {
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

  profile: Profile | null;
  roles: Roles;
  positions: Positions;
  departments: Departments;
  languages: Languages;
  equipments: Equipments;
  experiences: Experiences;
  educations: Educations;
};

type Users = User[];

export {
  AuthStatus,
  type User,
  type Users,
};
