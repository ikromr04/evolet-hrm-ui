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

type EducationUpdateRequest = {
  data: {
    type: 'educations';
    id: string;
    attributes: {
      institution?: string;
      faculty?: string;
      speciality?: string;
      form?: string;
      startedAt?: string;
      endedAt?: string;
    };
  };
};

type Data = {
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

type EducationResponse = {
  data: Data;
};

type EducationsResponse = {
  data: Data[];
};

export type {
  EducationStoreRequest,
  EducationUpdateRequest,
  EducationResponse,
  EducationsResponse,
};
