import { Language, Languages } from '../model/types';
import { LanguageResponse, LanguagesResponse } from './types';

const mapLanguage = (resource: LanguageResponse): Language => ({
  id: resource.data.id,
  ...resource.data.attributes
});

const mapLanguages = (collection: LanguagesResponse): Languages =>
  collection.data.map((data) => ({
    id: data.id,
    ...data.attributes
  }));

export {
  mapLanguage,
  mapLanguages,
};
