import { User } from '@/entities/user';
import { Badge } from '@/shared/ui';
import { IdCard, MapPin } from 'lucide-react';
import { JSX } from 'react';
import { UserAvatar } from './user-avatar';
import { useAppSelector } from '@/shared/store';
import { getDepartments } from '@/entities/department';
import { getPositions } from '@/entities/position';
import { getRoles } from '@/entities/role';

type UserHeaderProps = {
  user: User;
}

function UserHeader({
  user,
}: UserHeaderProps): JSX.Element {
  const departments = useAppSelector(getDepartments);
  const positions = useAppSelector(getPositions);
  const roles = useAppSelector(getRoles);

  const userDepartments = departments?.filter(({ id }) => user.departments.includes(id)) || [];
  const userPositions = positions?.filter(({ id }) => user.positions.includes(id)) || [];
  const userRoles = roles?.filter(({ id }) => user.roles.includes(id)) || [];

  return (
    <header className="flex items-end gap-4">
      <UserAvatar user={user} />

      <div className="flex flex-col gap-2">
        <h2>
          {user.surname} {user.name} {user.patronymic}
        </h2>

        <div className="flex items-center text-muted-foreground gap-2 font-light text-sm">
          <MapPin size={16} />
          {userDepartments.map(({ name }) => (
            <Badge key={name} variant="outline">
              {name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <IdCard className="text-muted-foreground" size={16} />
          <div className="flex flex-wrap gap-1">
            {userPositions.map((position) => (
              <Badge key={position.id} variant="secondary">
                {position.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {userRoles.map((role) => (
            <Badge key={role.id}>
              {role.displayName}
            </Badge>
          ))}
        </div>
      </div>
    </header>
  );
}

export { UserHeader };
