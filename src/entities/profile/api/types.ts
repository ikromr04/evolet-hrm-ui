import { FamilyStatus, Sex } from '../model/types';

type ProfileStoreRequest = {
  data: {
    type: 'profiles';
    attributes: {
      birthDate?: string;
      sex?: keyof typeof Sex;
      nationality?: string;
      citizenship?: string;
      address?: string;
      tel1?: string;
      tel2?: string;
      familyStatus?: keyof typeof FamilyStatus;
      children?: number[];
      startedWorkAt?: string;
    };
    relationships: {
      user: {
        data: { type: 'users', id: string };
      }
    }
  };
};

type ProfileResponse = {
  data: {
    type: 'profiles';
    id: string;
    attributes: {
      birthDate: string | null;
      sex: keyof typeof Sex | null;
      nationality: string | null;
      citizenship: string | null;
      address: string | null;
      tel1: string | null;
      tel2: string | null;
      familyStatus: keyof typeof FamilyStatus | null;
      children: number[] | null;
      startedWorkAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
    relationships: {
      user: {
        data: { type: 'users', id: string };
      }
    }
  };
};

type ProfilesResponse = {
  data: {
    type: 'profiles';
    id: string;
    attributes: {
      birthDate: string | null;
      sex: keyof typeof Sex | null;
      nationality: string | null;
      citizenship: string | null;
      address: string | null;
      tel1: string | null;
      tel2: string | null;
      familyStatus: keyof typeof FamilyStatus | null;
      children: number[] | null;
      startedWorkAt: string | null;
      createdAt: string;
      updatedAt: string;
    };
    relationships: {
      user: {
        data: { type: 'users', id: string };
      }
    }
  }[];
};

export type {
  ProfilesResponse,
  ProfileStoreRequest,
  ProfileResponse,
};
