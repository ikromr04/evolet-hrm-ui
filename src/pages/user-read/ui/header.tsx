import { User } from '@/entities/user';
import { Badge } from '@/shared/ui';
import { IdCard, MapPin } from 'lucide-react';
import { JSX } from 'react';
import { UserAvatar } from './user-avatar';

type HeaderProps = {
  user: User;
}

function Header({
  user,
}: HeaderProps): JSX.Element {
  return (
    <header className="flex items-end gap-4">
      <UserAvatar user={user} />

      <div className="flex flex-col gap-2">
        <h2>
          {user.surname} {user.name} {user.patronymic}
        </h2>

        <div className="flex items-center text-muted-foreground gap-2 font-light text-sm">
          <MapPin size={16} />
          {user.departments.map(({ name }) => (
            <Badge key={name} variant="outline">
              {name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <IdCard className="text-muted-foreground" size={16} />
          <div className="flex flex-wrap gap-1">
            {user.positions.map((position) => (
              <Badge key={position.id} variant="secondary">
                {position.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {user.roles.map((role) => (
            <Badge key={role.id}>
              {role.displayName}
            </Badge>
          ))}
        </div>
      </div>
    </header>
  );
}

export { Header };
