import { FamilyStatus, Sex } from '@/entities/profile';
import { User } from '@/entities/user';
import { UserUpdateDialog } from '@/features/user-update-dialog';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import dayjs from 'dayjs';
import { ChevronsUpDown, Edit } from 'lucide-react';
import { JSX } from 'react';

type ProfileContentProps = {
  user: User;
};

function ProfileContent({
  user,
}: ProfileContentProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <Collapsible defaultOpen>
        <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
          <header className="flex items-center rounded-t-xl bg-muted/50 py-2 px-4 gap-1">
            <h3 className="text-[16px]">
              Сотрудник
            </h3>
            <UserUpdateDialog
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
                <span className="sr-only">Toggle details</span>
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
                  {user.roles.length
                    ? user.roles.map((role) => role.displayName).join(', ')
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Должность</dt>
                <dd className="text-[16px] font-light">
                  {user.positions.length
                    ? user.positions.map((position) => position.name).join(', ')
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Отдел/Департамент</dt>
                <dd className="text-[16px] font-light">
                  {user.departments.length
                    ? user.departments.map((department) => department.name).join(', ')
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
            <Button
              className="ml-auto"
              type="button"
              size="sm"
              variant="outline"
            >
              <Edit size={16} />
              Редактировать
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <ChevronsUpDown size={16} />
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
          </header>

          <CollapsibleContent asChild>
            <dl className="flex flex-col gap-3 p-4 pt-2">
              <div>
                <dt className="text-xs text-muted-foreground">Дата рождения</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.birthDate
                    ? dayjs(user.profile.birthDate).format('DD MMMM YYYY')
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Пол</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.sex
                    ? Sex[user.profile.sex]
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Национальность</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.nationality || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Гражданство</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.citizenship || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Адрес</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.address || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Телефон 1</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.tel1 || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Телефон 2</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.tel2 || 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Семейное положение</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.familyStatus
                    ? FamilyStatus[user.profile.familyStatus]
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Семейное положение</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.familyStatus
                    ? FamilyStatus[user.profile.familyStatus]
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Дети</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.children
                    ? (user.profile.children.length === 0 ? 'Нет детей' : user.profile.children.map((year) => year).join(', '))
                    : 'Не указано'}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Начало работы в Эволет</dt>
                <dd className="text-[16px] font-light">
                  {user.profile?.startedWorkAt
                    ? dayjs(user.profile.startedWorkAt).format('DD MMMM YYYY')
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

export { ProfileContent };
