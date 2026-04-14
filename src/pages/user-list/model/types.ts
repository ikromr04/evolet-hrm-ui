type Filter = {
  keyword: string;
  name: string;
  email: string;
  sex: string;
  nationality: string;
  citizenship: string;
  address: string;
  tel: string;
  familyStatus: string;
  children: number[] | string;
  startedWorkAt: string;
  roles: string[];
  positions: string[];
  departments: string[];
};

export type { Filter };
