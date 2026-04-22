import { getDepartments } from '@/entities/department';
import { getLanguages, LanguageLevel } from '@/entities/language';
import { getPositions } from '@/entities/position';
import { FamilyStatus, getProfiles, Sex } from '@/entities/profile';
import { getRoles } from '@/entities/role';
import { User } from '@/entities/user';
import { ProfileCreateDialog } from '@/features/profile-create-dialog';
import { ProfileEditDialog } from '@/features/profile-edit-dialog';
import { UserEditDialog } from '@/features/user-edit-dialog';
import { useAppSelector } from '@/shared/store';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import dayjs from 'dayjs';
import { ChevronsUpDown, Edit } from 'lucide-react';
import { JSX } from 'react';

type UserProfileProps = {
  user: User;
};

function UserProfile({
  user,
}: UserProfileProps): JSX.Element {
  const departments = useAppSelector(getDepartments);
  const positions = useAppSelector(getPositions);
  const roles = useAppSelector(getRoles);
  const profiles = useAppSelector(getProfiles);
  const languages = useAppSelector(getLanguages);

  const userDepartments = departments?.filter(({ id }) => user.departments.includes(id)) || [];
  const userPositions = positions?.filter(({ id }) => user.positions.includes(id)) || [];
  const userRoles = roles?.filter(({ id }) => user.roles.includes(id)) || [];
  const userProfile = profiles?.find(({ userId }) => user.id === userId);
  const userLanguages = languages?.filter(({ id }) => user.languages.includes(id)) || [];

  return (
    <div className="flex flex-col gap-4">
      <Collapsible defaultOpen>
        <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
          <header className="flex items-center rounded-t-xl bg-muted/50 py-2 px-4 gap-1">
            <h3 className="text-[16px]">
              Сотрудник
            </h3>
            <UserEditDialog
              key={JSON.stringify(user)}
              user={user}
              trigger={
                <Button
                  className="ml-auto"
                  type="button"
                  size="sm"
                  variant="outline"
                >
                  <Edit size={16} />
                  Редактировать
                </Button>
              }
            />
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <ChevronsUpDown size={16} />
                <span className="sr-only">Показать подробности</span>
              </Button>
            </CollapsibleTrigger>
          </header>

          <CollapsibleContent asChild>
            <dl className="flex flex-col gap-3 p-4 pt-2 border-t">
              <div>
                <dt className="text-xs text-muted-foreground">Фамилия</dt>
                <dd className="text-[16px] font-light">{user.surname}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Имя</dt>
                <dd className="text-[16px] font-light">{user.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Отчество</dt>
                <dd className="text-[16px] font-light">{user.patronymic}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Email</dt>
                <dd className="text-[16px] font-light">{user.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Позиция</dt>
                <dd className="text-[16px] font-light">
                  {userRoles.length
                    ? userRoles.map((role) => (
                      <div key={role.id}>
                        {role.displayName}
                      </div>
                    ))
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Должность</dt>
                <dd className="text-[16px] font-light">
                  {userPositions.length
                    ? userPositions.map((position) => (
                      <div key={position.id}>
                        {position.name}
                      </div>
                    ))
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Отдел/Департамент</dt>
                <dd className="text-[16px] font-light">
                  {userDepartments.length
                    ? userDepartments.map((department) => (
                      <div key={department.id}>
                        {department.name}
                      </div>
                    ))
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Знание языков</dt>
                <dd className="text-[16px] font-light">
                  {userLanguages.length
                    ? userLanguages.map((language) => (
                      <div key={language.id}>
                        {language.name} {LanguageLevel[language.level]}
                      </div>
                    ))
                    : 'Не указано'}
                </dd>
              </div>
            </dl>
          </CollapsibleContent>
        </section>
      </Collapsible>

      <Collapsible defaultOpen>
        <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
          <header className="flex items-center rounded-t-xl border-b bg-muted/50 py-2 px-4 gap-1">
            <h3 className="text-[16px]">
              Данные сотрудника
            </h3>
            {userProfile ? (
              <ProfileEditDialog
                key={JSON.stringify(userProfile)}
                profile={userProfile}
                trigger={
                  <Button
                    className="ml-auto"
                    type="button"
                    size="sm"
                    variant="outline"
                  >
                    <Edit size={16} />
                    Редактировать
                  </Button>
                }
              />
            ) : (
              (
                <ProfileCreateDialog
                  key={JSON.stringify(user)}
                  user={user}
                  trigger={
                    <Button
                      className="ml-auto"
                      type="button"
                      size="sm"
                      variant="outline"
                    >
                      <Edit size={16} />
                      Редактировать
                    </Button>
                  }
                />
              )
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <ChevronsUpDown size={16} />
                <span className="sr-only">Показать подробности</span>
              </Button>
            </CollapsibleTrigger>
          </header>

          <CollapsibleContent asChild>
            <dl className="flex flex-col gap-3 p-4 pt-2">
              <div>
                <dt className="text-xs text-muted-foreground">Дата рождения</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.birthDate
                    ? dayjs(userProfile.birthDate).format('DD MMMM YYYY')
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Пол</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.sex
                    ? Sex[userProfile.sex]
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Национальность</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.nationality || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Гражданство</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.citizenship || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Адрес</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.address || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Телефон 1</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.tel1 || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Телефон 2</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.tel2 || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Семейное положение</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.familyStatus
                    ? FamilyStatus[userProfile.familyStatus]
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Дети</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.children
                    ? (userProfile.children.length === 0 ? 'Нет детей' : userProfile.children.map((year) => year).join(', '))
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Начало работы в Эволет</dt>
                <dd className="text-[16px] font-light">
                  {userProfile?.startedWorkAt
                    ? dayjs(userProfile.startedWorkAt).format('DD MMMM YYYY')
                    : 'Не указано'}
                </dd>
              </div>
            </dl>
          </CollapsibleContent>
        </section>
      </Collapsible>
    </div>
  );
}

export { UserProfile };
