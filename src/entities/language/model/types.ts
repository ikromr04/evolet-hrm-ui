const LanguageLevel = {
  'A1': 'начальный',
  'A2': 'ниже среднего',
  'B1': 'средний',
  'B2': 'выше среднего',
  'C1': 'продвинутый',
  'C2': 'профессиональный',
};

type Language = {
  id: string;
  name: string;
  level: keyof typeof LanguageLevel;
  createdAt: string;
  updatedAt: string;
};

type Languages = Language[];

export type {
  Language,
  Languages,
};

export { LanguageLevel };
