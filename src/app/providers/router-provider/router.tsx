import { createBrowserRouter } from 'react-router-dom';
import { PrivateRouter } from './private-router';
import { AppLayout } from '../../layouts';
import { ROUTES } from '@/shared/config';
import { Home } from '@/pages/home';
import { UserList } from '@/pages/user-list';
import { UserRead } from '@/pages/user-read';
import { UserFiredList } from '@/pages/user-fired-list';
import { UserTransferredList } from '@/pages/user-transferred-list';
import { EquipmentList } from '@/pages/equipment-list';
import { VacationList } from '@/pages/vacation-list';
import { DepartmentList } from '@/pages/department-list';
import { PositionList } from '@/pages/position-list';
import { RoleList } from '@/pages/role-list';
import { LanguageList } from '@/pages/language-list';
import { Login } from '@/pages/login';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <PrivateRouter />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            Component: Home,
            handle: { title: 'Главная' },
          },
          {
            path: ROUTES.USER_LIST,
            Component: UserList,
            handle: { title: 'Текущие сотрудники' },
          },
          {
            path: ROUTES.USER_FIRED_LIST,
            Component: UserFiredList,
            handle: { title: 'Уволенные сотрудники' },
          },
          {
            path: ROUTES.USER_TRANSFERRED_LIST,
            Component: UserTransferredList,
            handle: { title: 'Переведенные сотрудники' },
          },
          {
            path: ROUTES.USER_READ,
            Component: UserRead,
            handle: { title: 'Сотрудник' },
          },
          {
            path: ROUTES.EQUIPMENT_LIST,
            Component: EquipmentList,
            handle: { title: 'Оборудование' },
          },
          {
            path: ROUTES.VACATION_LIST,
            Component: VacationList,
            handle: { title: 'Отпуски' },
          },
          {
            path: ROUTES.DEPARTMENT_LIST,
            Component: DepartmentList,
            handle: { title: 'Отделы/Департаменты' },
          },
          {
            path: ROUTES.POSITION_LIST,
            Component: PositionList,
            handle: { title: 'Должности' },
          },
          {
            path: ROUTES.ROLE_LIST,
            Component: RoleList,
            handle: { title: 'Позиции' },
          },
          {
            path: ROUTES.LANGUAGE_LIST,
            Component: LanguageList,
            handle: { title: 'Языки' },
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    Component: Login,
  },
]);

export { router };
