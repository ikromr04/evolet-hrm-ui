const LanguageLevel = {
  'A1': '(A1) - начальный',
  'A2': '(A2) - ниже среднего',
  'B1': '(B1) - средний',
  'B2': '(B2) - выше среднего',
  'C1': '(C1) - продвинутый',
  'C2': '(C2) - профессиональный',
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
