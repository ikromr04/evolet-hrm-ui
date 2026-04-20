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
import { Header } from './header';
import { ProfileContent } from './profile-content';
import Sidebar from './sidebar';

function UserReadPage(): JSX.Element {
  const { setTitle } = useHeader();
  const params = useParams();
  const dispatch = useAppDispatch();
  const usersStatus = useAppSelector(getUsersStatus);
  const rolesStatus = useAppSelector(getRolesStatus);
  const profilesStatus = useAppSelector(getProfilesStatus);
  const users = useAppSelector(getUsers);

  const user = useMemo(() => {
    return users?.find(({ id }) => id === params.id);
  }, [params.id, users]);

  useEffect(() => {
    if (user) setTitle(`${user.surname} ${user.name}`);
    if (usersStatus === AsyncStatus.IDLE) dispatch(fetchUsersAction());
    if (rolesStatus === AsyncStatus.IDLE) dispatch(fetchRolesAction());
    if (profilesStatus === AsyncStatus.IDLE) dispatch(fetchProfilesAction());
  }, [dispatch, profilesStatus, rolesStatus, setTitle, user, usersStatus]);

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

      <Header user={user} />

      <div className="grid grid-cols-[3fr_1fr] gap-4">
        <Tabs className="gap-4" defaultValue="profile">
          <TabsList variant="line">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="educations">Образование</TabsTrigger>
            <TabsTrigger value="experiences">Работа</TabsTrigger>
            <TabsTrigger value="equipments">Оборудование</TabsTrigger>
            <TabsTrigger value="vacations">Отпуск</TabsTrigger>
            <TabsTrigger value="pir">ПИР</TabsTrigger>
            <TabsTrigger value="kpi">KPI</TabsTrigger>
            <TabsTrigger value="attendance">Посещаемость</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileContent user={user} />
          </TabsContent>
          <TabsContent value="educations">
            Образование
          </TabsContent>
          <TabsContent value="experiences">
            Работа
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

        <Sidebar user={user} users={users} />
      </div>
    </main>
  );
}

export { UserReadPage };
