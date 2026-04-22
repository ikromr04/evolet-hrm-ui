type ExperienceStoreRequest = {
  data: {
    type: 'experiences';
    attributes: {
      companyName: string;
      position: string;
      startedAt: string;
      endedAt: string;
    };
    relationships: {
      user: {
        data: { type: 'users', id: string };
      }
    }
  };
};

type ExperienceUpdateRequest = {
  data: {
    type: 'experiences';
    id: string;
    attributes: {
      companyName?: string;
      position?: string;
      startedAt?: string;
      endedAt?: string;
    };
  };
};

type Data = {
  type: 'experiences';
  id: string;
  attributes: {
    companyName: string;
    position: string;
    startedAt: string;
    endedAt: string;
    createdAt: string;
    updatedAt: string;
  };
  relationships: {
    user: {
      data: { type: 'users', id: string };
    }
  };
}

type ExperienceResponse = {
  data: Data;
};

type ExperiencesResponse = {
  data: Data[];
};

export type {
  ExperienceStoreRequest,
  ExperienceUpdateRequest,
  ExperienceResponse,
  ExperiencesResponse,
};
