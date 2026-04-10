type LanguageResponse = {
  data: {
    type: 'languages';
    id: string;
    attributes: {
      name: string;
      level: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type LanguagesResponse = {
  data: {
    type: 'languages';
    id: string;
    attributes: {
      name: string;
      level: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export type {
  LanguageResponse,
  LanguagesResponse,
};
