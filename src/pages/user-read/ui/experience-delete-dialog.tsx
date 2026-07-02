import { deleteExperienceAction, Experience } from '@/entities/experience';
import { ApiErrors } from '@/shared/api';
import { useAppDispatch } from '@/shared/store';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@/shared/ui';
import { JSX, useState } from 'react';
import { toast } from 'sonner';

type ExperienceDeleteDialogProps = {
  trigger: JSX.Element;
  experience: Experience;
};

function ExperienceDeleteDialog({
  trigger,
  experience,
}: ExperienceDeleteDialogProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleButtonClick = async () => {
    setIsSubmitting(true);

    await dispatch(deleteExperienceAction({ data: experience }))
      .unwrap()
      .then(() => {
        toast.success('Опыт успешно удален.');
        setIsOpen(false);
      })
      .catch((errors: ApiErrors) => {
        errors.forEach((error) => {
          toast.error(error.detail);
        });
      });

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-auto">
        <div className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>
              Удалить опыт работы
            </DialogTitle>
            <DialogDescription>
              Вы уверены что хотите удалить это место работы?
              ({experience.companyName})
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Отмена
              </Button>
            </DialogClose>
            <Button
              type="button"
              disabled={isSubmitting}
              variant="destructive"
              onClick={handleButtonClick}
            >
              {isSubmitting && <Spinner />}
              Удалить
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ExperienceDeleteDialog };
