type UserDetailStoreRequest = {
  data: {
    type: 'user-details';
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

type UserDetailResponse = {
  data: {
    type: 'user-details';
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
  UserDetailStoreRequest,
  UserDetailResponse,
};
