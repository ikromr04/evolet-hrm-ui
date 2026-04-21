import { fetchLanguagesAction, getLanguages, getLanguagesStatus, LanguageLevel } from '@/entities/language';
import { User, Users } from '@/entities/user';
import { Button, ButtonGroup } from '@/shared/ui';
import dayjs from 'dayjs';
import { ArrowLeft, ArrowRight, Mail, Phone } from 'lucide-react';
import { JSX, useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { getWorkDuration } from '../lib/utils';
import { ROUTES } from '@/shared/config';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { getProfiles } from '@/entities/profile';

type UserSidebarProps = {
  user: User;
  users: Users;
};

function UserSidebar({
  user,
  users,
}: UserSidebarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const languagesStatus = useAppSelector(getLanguagesStatus);

  const profiles = useAppSelector(getProfiles);
  const languages = useAppSelector(getLanguages);

  const userProfile = profiles?.find(({ userId }) => user.id === userId);
  const userLanguages = languages?.filter(({ id }) => user.languages.includes(id)) || [];

  const phoneNumbers = userProfile?.tel1 || userProfile?.tel2 || null;

  const userIndex = users.findIndex(({ id }) => id === user.id);
  const prevUserId = users[userIndex - 1]?.id || '';
  const nextUserId = users[userIndex + 1]?.id || '';

  useEffect(() => {
    if (languagesStatus === AsyncStatus.IDLE) dispatch(fetchLanguagesAction());
  }, [dispatch, languagesStatus]);

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup className="ml-auto">
        {prevUserId ? (
          <Button type="button" variant="outline" asChild disabled>
            <Link to={generatePath(ROUTES.USER_READ, { id: prevUserId })}>
              <ArrowLeft size={16} /> Предыдущий
            </Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" disabled>
            <ArrowLeft size={16} /> Предыдущий
          </Button>
        )}
        {nextUserId ? (
          <Button type="button" variant="outline" asChild>
            <Link to={generatePath(ROUTES.USER_READ, { id: nextUserId })}>
              Следующий <ArrowRight size={16} />
            </Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" disabled>
            Следующий <ArrowRight size={16} />
          </Button>
        )}
      </ButtonGroup>

      <dl className="flex overflow-hidden flex-col gap-2 p-4 pt-2 rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
        <div>
          <dt className="text-xs text-muted-foreground">
            Написать
          </dt>
          <dd>
            <Button variant="link" asChild>
              <Link className="p-0!" to={`mailto:${user.email}`}>
                <Mail size={16} /> {user.email}
              </Link>
            </Button>
          </dd>
        </div>
        {phoneNumbers && ( 
          <div>
            <dt className="text-xs text-muted-foreground">
              Позвонить
            </dt>
            <dd>
              <Button variant="link" asChild>
                <Link className="p-0!" to={`tel:${phoneNumbers}`}>
                  <Phone size={16} /> {phoneNumbers}
                </Link>
              </Button>
            </dd>
          </div>
        )}
        <div>
          <dt className="text-xs text-muted-foreground">Начало работы</dt>
          <dd className="text-[14px]">
            {userProfile?.startedWorkAt
              ? dayjs(userProfile.startedWorkAt).format('DD MMMM YYYY')
              : 'Не указано'}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Стаж</dt>
          <dd className="text-[14px]">
            {userProfile?.startedWorkAt
              ? getWorkDuration(userProfile.startedWorkAt)
              : 'Не указано'}
          </dd>
        </div>
      </dl>

      <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
        <header className="flex items-center rounded-t-xl border-b bg-muted/50 py-2 px-4">
          <h3 className="text-[16px]">
            Знание языков
          </h3>
        </header>

        <dl className="flex flex-col gap-2 p-4 pt-2 text-[14px]">
          {userLanguages.length ? userLanguages.map((lang) => (
            <div key={lang.id}>
              <dt className="text-[14px]">{lang.name}</dt>
              <dd className="text-xs text-muted-foreground">{LanguageLevel[lang.level]}</dd>
            </div>
          )) : 'Не указано'}
        </dl>
      </section>
    </div>
  );
}

export { UserSidebar };
