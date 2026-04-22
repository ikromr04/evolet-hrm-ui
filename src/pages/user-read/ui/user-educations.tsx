import { fetchEducationsAction, getEducations, getEducationsStatus } from '@/entities/education';
import { User } from '@/entities/user';
import { EducationCreateDialog } from '@/features/education-create-dialog';
import { EducationDeleteDialog } from '@/features/education-delete-dialog';
import { EducationEditDialog } from '@/features/education-edit-dialog';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { Button, ButtonGroup, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { JSX, useEffect } from 'react';

type UserEducationsProps = {
  user: User;
};

function UserEducations({
  user,
}: UserEducationsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const educationsStatus = useAppSelector(getEducationsStatus);
  const educations = useAppSelector(getEducations);

  const userEducations = educations?.filter(({ id }) => user.educations.includes(id));

  useEffect(() => {
    if (educationsStatus === AsyncStatus.IDLE) dispatch(fetchEducationsAction());
  }, [dispatch, educationsStatus]);

  return (
    <div className="flex flex-col gap-4">
      <Collapsible defaultOpen>
        <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
          <header className="flex items-center rounded-t-xl bg-muted/50 py-2 px-4 gap-1">
            <h3 className="text-[16px]">
              Образования
            </h3>
            <EducationCreateDialog
              key={JSON.stringify(user)}
              user={user}
              trigger={
                <Button
                  className="ml-auto"
                  type="button"
                  size="sm"
                  variant="outline"
                >
                  <Plus size={16} />
                  Добавить
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

          <CollapsibleContent>
            {userEducations?.map((education) => (
              <div className="relative z-0" key={education.id}>
                <dl className="flex flex-col gap-3 p-4 pt-2 border-t">
                  <div>
                    <dt className="text-xs text-muted-foreground">Учебное заведение</dt>
                    <dd className="text-[16px] font-light">{education.institution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Факультет</dt>
                    <dd className="text-[16px] font-light">{education.faculty}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Специальность</dt>
                    <dd className="text-[16px] font-light">{education.speciality}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Форма обучения</dt>
                    <dd className="text-[16px] font-light">{education.form}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Год поступления</dt>
                    <dd className="text-[16px] font-light">{education.startedAt}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Год окончания</dt>
                    <dd className="text-[16px] font-light">{education.endedAt}</dd>
                  </div>
                </dl>
                <ButtonGroup className="absolute top-2 right-4">
                  <EducationDeleteDialog
                    key={education.id}
                    education={education}
                    trigger={
                      <Button type="button" variant="destructive" size="sm">
                        Удалить
                      </Button>
                    }
                  />
                  <EducationEditDialog
                    key={JSON.stringify(education)}
                    education={education}
                    trigger={
                      <Button type="button" variant="secondary" size="sm">
                        Редактировать
                      </Button>
                    }
                  />
                </ButtonGroup>
              </div>
            ))}
          </CollapsibleContent>
        </section>
      </Collapsible>
    </div>
  );
}

export { UserEducations };
