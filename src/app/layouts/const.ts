import { ROUTES } from '@/shared/config';
import { House, MonitorSmartphone, TentTree, Users } from 'lucide-react';

const MAIN_NAV_ITEMS = [
  {
    label: 'Главная',
    icon: House,
    route: ROUTES.HOME
  },
  {
    label: 'Сотрудники',
    icon: Users,
    route: ROUTES.USER_LIST,
    submenus: [
      {
        label: 'Справочник',
        route: ROUTES.USER_LIST
      },
      {
        label: 'Орг. структура',
        route: ROUTES.USER_STRUCTURE
      },
      {
        label: 'Уволенные',
        route: ROUTES.USER_FORMER
      },
      {
        label: 'Переведённые',
        route: ROUTES.USER_TRANSFERRED
      },
    ]
  },
  {
    label: 'Оборудование',
    icon: MonitorSmartphone,
    route: ROUTES.EQUIPMENTS
  },
  {
    label: 'Отпуски',
    icon: TentTree,
    route: ROUTES.VACATIONS
  }
];

const REF_NAV_ITEMS = [
  {
    label: 'Отделы/Департаменты',
    route: ROUTES.DEPARTMENTS
  },
  {
    label: 'Должности',
    route: ROUTES.JOBS
  },
  {
    label: 'Позиции',
    route: ROUTES.POSITIONS
  },
  {
    label: 'Языки',
    route: ROUTES.LANGUAGES
  },
];

export { MAIN_NAV_ITEMS, REF_NAV_ITEMS };
