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

type ExperienceResponse = {
  data: {
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
    }
  };
};

export type {
  ExperienceStoreRequest,
  ExperienceResponse,
};
