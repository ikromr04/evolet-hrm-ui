import { JSX, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/shared/ui';
import { AvatarUpload } from './avatar-upload';
import { User } from '@/entities/user';
import SuccessModal from './success-modal';
import UserCreate from './user-create';

type UserCreateDialogProps = {
  trigger: JSX.Element;
}

type Step = 'user-base-info' | 'avatar-upload' | 'success';

function UserCreateDialog({
  trigger
}: UserCreateDialogProps): JSX.Element {
  const [step, setStep] = useState<Step>('user-base-info');
  const [user, setUser] = useState<User>();

  const renderStep = (step: Step) => {
    switch (step) {
      case 'user-base-info':
        return <UserCreate setStep={setStep} setUser={setUser} />;
      case 'avatar-upload':
        return user ? <AvatarUpload setStep={setStep} user={user} /> : null;
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
