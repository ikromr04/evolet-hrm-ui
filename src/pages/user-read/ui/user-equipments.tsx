import { fetchEquipmentsAction, getEquipments, getEquipmentsStatus } from '@/entities/equipment';
import { User } from '@/entities/user';
import { EquipmentCreateDialog } from '@/features/equipment-create-dialog';
import { EquipmentDeleteDialog } from '@/features/equipment-delete-dialog';
import { EquipmentEditDialog } from '@/features/equipment-edit-dialog';
import { AsyncStatus, useAppDispatch, useAppSelector } from '@/shared/store';
import { Button, ButtonGroup, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/ui';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { JSX, useEffect } from 'react';

type UserEquipmentsProps = {
  user: User;
};

function UserEquipments({
  user,
}: UserEquipmentsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const equipmentsStatus = useAppSelector(getEquipmentsStatus);
  const equipments = useAppSelector(getEquipments);

  const userEquipments = equipments?.filter(({ id }) => user.equipments.includes(id));

  useEffect(() => {
    if (equipmentsStatus === AsyncStatus.IDLE) dispatch(fetchEquipmentsAction());
  }, [dispatch, equipmentsStatus]);

  return (
    <div className="flex flex-col gap-4">
      <Collapsible defaultOpen>
        <section className="flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
          <header className="flex items-center rounded-t-xl bg-muted/50 py-2 px-4 gap-1">
            <h3 className="text-[16px]">
              Оборудование
            </h3>
            <EquipmentCreateDialog
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
            {userEquipments?.map((equipment) => (
              <div className="relative z-0" key={equipment.id}>
                <dl className="flex flex-col gap-3 p-4 pt-2 border-t">
                  <div>
                    <dt className="text-xs text-muted-foreground">Название</dt>
                    <dd className="text-[16px] font-light">{equipment.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Описание</dt>
                    <dd className="text-[16px] font-light">{equipment.description || '-'}</dd>
                  </div>
                </dl>
                <ButtonGroup className="absolute top-2 right-4">
                  <EquipmentDeleteDialog
                    key={equipment.id}
                    equipment={equipment}
                    trigger={
                      <Button type="button" variant="destructive" size="sm">
                        Удалить
                      </Button>
                    }
                  />
                  <EquipmentEditDialog
                    key={JSON.stringify(equipment)}
                    equipment={equipment}
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

export { UserEquipments };
