import { LanguageLevel } from '../model/types';

type LanguageResponse = {
  data: {
    type: 'languages';
    id: string;
    attributes: {
      name: string;
      level: keyof typeof LanguageLevel;
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
      level: keyof typeof LanguageLevel;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export type {
  LanguageResponse,
  LanguagesResponse,
};
