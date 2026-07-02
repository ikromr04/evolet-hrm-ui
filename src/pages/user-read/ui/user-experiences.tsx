import { fetchExperiencesAction, getExperiences, getExperiencesStatus } from '@/entities/experience';
import { User } from '@/entities/user';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { Button, ButtonGroup, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { JSX, useEffect } from 'react';
import { ExperienceCreateDialog } from './experience-create-dialog';
import { ExperienceDeleteDialog } from './experience-delete-dialog';
import { ExperienceEditDialog } from './experience-edit-dialog';

type UserExperiencesProps = {
  user: User;
};

function UserExperiences({
  user,
}: UserExperiencesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const experiencesStatus = useAppSelector(getExperiencesStatus);
  const experiences = useAppSelector(getExperiences);

  const userExperiences = experiences?.filter(({ id }) => user.experiences.includes(id));

  useEffect(() => {
    if (experiencesStatus === AsyncStatus.IDLE) dispatch(fetchExperiencesAction());
  }, [dispatch, experiencesStatus]);

  return (
    <div className="flex flex-col gap-4">
      <Collapsible defaultOpen>
        <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
          <header className="flex items-center rounded-t-xl bg-muted/50 py-2 px-4 gap-1">
            <h3 className="text-[16px]">
              Трудовая деятельность
            </h3>
            <ExperienceCreateDialog
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
            {userExperiences?.map((experience) => (
              <div className="relative z-0" key={experience.id}>
                <dl className="flex flex-col gap-3 p-4 pt-2 border-t">
                  <div>
                    <dt className="text-xs text-muted-foreground">Организация</dt>
                    <dd className="text-[16px] font-light">{experience.companyName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Должность</dt>
                    <dd className="text-[16px] font-light">{experience.position}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Начало работы</dt>
                    <dd className="text-[16px] font-light">{experience.startedAt}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Конец работы</dt>
                    <dd className="text-[16px] font-light">{experience.endedAt}</dd>
                  </div>
                </dl>
                <ButtonGroup className="absolute top-2 right-4">
                  <ExperienceDeleteDialog
                    key={experience.id}
                    experience={experience}
                    trigger={
                      <Button type="button" variant="destructive" size="sm">
                        Удалить
                      </Button>
                    }
                  />
                  <ExperienceEditDialog
                    key={JSON.stringify(experience)}
                    experience={experience}
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

export { UserExperiences };
