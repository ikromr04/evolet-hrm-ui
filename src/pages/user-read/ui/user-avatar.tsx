import { updateAvatarAction, User } from '@/entities/user';
import { ApiErrors } from '@/shared/api';
import { cn } from '@/shared/lib';
import { useAppDispatch } from '@/shared/store';
import { Avatar, AvatarFallback, AvatarImage, Button, Popover, PopoverContent, PopoverTrigger, Spinner } from '@/shared/ui';
import { BaseSyntheticEvent, JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type UserAvatarProps = {
  user: User;
};

function UserAvatar({
  user,
}: UserAvatarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInputChange = async (evt: BaseSyntheticEvent) => {
    setIsSubmitting(true);
    await dispatch(updateAvatarAction({
      payload: {
        id: user.id,
        avatar: evt.target.files[0],
      }
    }))
      .unwrap()
      .then(() => toast.success('Фото профиля успешно сохранен.'))
      .catch((errors: ApiErrors) => toast.error(errors[0]?.detail));
    setIsSubmitting(false);
  };

  const handleDeleteButtonClick = async () => {
    setIsDeleting(true);
    await dispatch(updateAvatarAction({
      payload: {
        id: user.id,
        avatar: null,
      }
    }))
      .unwrap()
      .then(() => toast.success('Фото профиля успешно удален.'))
      .catch((errors: ApiErrors) => toast.error(errors[0]?.detail));
    setIsDeleting(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="size-36 min-w-36">
          <AvatarImage
            src={user.avatarThumb || undefined}
            alt={`${user.surname} ${user.name}`}
          />
          <AvatarFallback>
            {user.surname.charAt(0)}
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-36 gap-0">
        <Button variant="ghost" asChild>
          <label className={cn('justify-start', isSubmitting && 'pointer-events-none opacity-70')}>
            {isSubmitting && <Spinner />}
            {user.avatar ? 'Редактировать' : 'Выбрать фото'}
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        </Button>
        {user.avatar && (<>
          <Button variant="ghost" asChild>
            <Link className="justify-start" to={user.avatar} target="_blank">
              Посмотреть
            </Link>
          </Button>
          <Button
            className="justify-start"
            type="button"
            variant="ghost"
            disabled={isDeleting}
            onClick={handleDeleteButtonClick}
          >
            {isDeleting && <Spinner />}
            Удалить
          </Button>
        </>)}
      </PopoverContent>
    </Popover>
  );
}

export { UserAvatar };
