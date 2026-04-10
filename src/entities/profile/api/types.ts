type ProfileStoreRequest = {
  data: {
    type: 'profiles';
    attributes: {
      birthDate?: string;
      sex?: string;
      nationality?: string;
      citizenship?: string;
      address?: string;
      tel1?: string;
      tel2?: string;
      familyStatus?: string;
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
      sex: string | null;
      nationality: string | null;
      citizenship: string | null;
      address: string | null;
      tel1: string | null;
      tel2: string | null;
      familyStatus: string | null;
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

export type {
  ProfileStoreRequest,
  ProfileResponse,
};
