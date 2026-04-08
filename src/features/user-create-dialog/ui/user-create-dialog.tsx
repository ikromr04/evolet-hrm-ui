import { JSX, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/ui';
import { User } from '@/entities/user';
import SuccessModal from './success-modal';
import UserCreate from './user-create';
import UserDetailCreate from './user-detail-create';

type UserCreateDialogProps = {
  trigger: JSX.Element;
}

type Step = 'user' | 'user-details' | 'success';

function UserCreateDialog({
  trigger
}: UserCreateDialogProps): JSX.Element {
  const [step, setStep] = useState<Step>('user');
  const [user, setUser] = useState<User>();

  const renderStep = (step: Step) => {
    switch (step) {
      case 'user':
        return <UserCreate setStep={setStep} setUser={setUser} />;
      case 'user-details':
        return user ? <UserDetailCreate setStep={setStep} user={user} /> : null;
      case 'success':
        return user ? <SuccessModal setStep={setStep} user={user} /> : null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent>
        {renderStep(step)}
      </DialogContent>
    </Dialog>
  );
}

export {
  type Step,
  UserCreateDialog,
};
