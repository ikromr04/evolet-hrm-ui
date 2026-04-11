type EducationStoreRequest = {
  data: {
    type: 'educations';
    attributes: {
      institution: string;
      faculty: string;
      speciality: string;
      form: string;
      startedAt: string;
      endedAt?: string;
    };
    relationships: {
      user: {
        data: { type: 'users', id: string };
      }
    }
  };
};

type EducationResponse = {
  data: {
    type: 'educations';
    id: string;
    attributes: {
      institution: string;
      faculty: string;
      speciality: string;
      form: string;
      startedAt: string;
      endedAt: string | null;
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
  EducationStoreRequest,
  EducationResponse,
};
