import { fetchProfilesAction, getProfilesStatus } from '@/entities/profile';
import { fetchRolesAction, getRolesStatus } from '@/entities/role';
import { fetchUsersAction, getUsers, getUsersStatus } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { useHeader } from '@/shared/lib';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/ui';
import { JSX, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserHeader } from './user-header';
import { UserProfile } from './user-profile';
import { fetchPositionsAction, getPositionsStatus } from '@/entities/position';
import { fetchDepartmentsAction, getDepartmentsStatus } from '@/entities/department';
import { UserSidebar } from './user-sidebar';
import { fetchLanguagesAction, getLanguagesStatus } from '@/entities/language';
import { UserEducations } from './user-educations';
import { UserExperiences } from './user-experiences';

function UserReadPage(): JSX.Element {
  const { setTitle } = useHeader();
  const params = useParams();
  const dispatch = useAppDispatch();

  const usersStatus = useAppSelector(getUsersStatus);
  const profilesStatus = useAppSelector(getProfilesStatus);
  const rolesStatus = useAppSelector(getRolesStatus);
  const positionsStatus = useAppSelector(getPositionsStatus);
  const departmentsStatus = useAppSelector(getDepartmentsStatus);
  const languagesStatus = useAppSelector(getLanguagesStatus);

  const users = useAppSelector(getUsers);

  const user = useMemo(() => {
    return users?.find(({ id }) => id === params.id);
  }, [params.id, users]);

  useEffect(() => {
    if (user) setTitle(`${user.surname} ${user.name}`);
    if (usersStatus === AsyncStatus.IDLE) dispatch(fetchUsersAction());
    if (profilesStatus === AsyncStatus.IDLE) dispatch(fetchProfilesAction());
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (positionsStatus === AsyncStatus.IDLE) dispatch(fetchPositionsAction());
    if (departmentsStatus === AsyncStatus.IDLE) dispatch(fetchDepartmentsAction());
    if (languagesStatus === AsyncStatus.IDLE) dispatch(fetchLanguagesAction());
  }, [departmentsStatus, dispatch, languagesStatus, positionsStatus, profilesStatus, rolesStatus, setTitle, user, usersStatus]);

  if (!user || !users) {
    return <></>;
  }

  return (
    <main className="@container/main flex flex-1 flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={ROUTES.USER_LIST}>
                Справочник сотрудников
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {user.surname} {user.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <UserHeader user={user} />

      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <Tabs className="gap-4" defaultValue="profile">
          <TabsList variant="line">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="educations">Образование</TabsTrigger>
            <TabsTrigger value="experiences">Опыт</TabsTrigger>
            <TabsTrigger value="equipments">Оборудование</TabsTrigger>
            <TabsTrigger value="vacations">Отпуск</TabsTrigger>
            <TabsTrigger value="pir">ПИР</TabsTrigger>
            <TabsTrigger value="kpi">KPI</TabsTrigger>
            <TabsTrigger value="attendance">Посещаемость</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile user={user} />
          </TabsContent>
          <TabsContent value="educations">
            <UserEducations user={user} />
          </TabsContent>
          <TabsContent value="experiences">
            <UserExperiences user={user} />
          </TabsContent>
          <TabsContent value="equipments">
            Оборудование
          </TabsContent>
          <TabsContent value="vacations">
            Отпуск
          </TabsContent>
          <TabsContent value="pir">
            ПИР
          </TabsContent>
          <TabsContent value="kpi">
            KPI
          </TabsContent>
          <TabsContent value="attendance">
            Посещаемость
          </TabsContent>
        </Tabs>

        <UserSidebar user={user} users={users} />
      </div>
    </main>
  );
}

export { UserReadPage };
