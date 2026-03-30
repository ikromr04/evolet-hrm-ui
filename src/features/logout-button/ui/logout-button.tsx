import { logoutAction } from '@/entities/user';
import { useAppDispatch } from '@/shared/store';
import { LogOut } from 'lucide-react';
import { BaseSyntheticEvent, JSX } from 'react';

function LogoutButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const onClick = async (evt: BaseSyntheticEvent) => {
    evt.target.setAttribute('disabled', 'true');

    await dispatch(logoutAction());
  };

  return (
    <button
      className="flex items-center gap-1.5 w-full"
      type="button"
      onClick={onClick}
    >
      <LogOut size={16} />
      Выйти из аккаунта
    </button>
  );
}

export { LogoutButton };
