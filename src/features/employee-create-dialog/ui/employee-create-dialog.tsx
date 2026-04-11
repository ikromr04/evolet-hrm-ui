import { JSX, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui';
import { User } from '@/entities/user';
import { SuccessModal } from './success-modal';
import { UserCreate } from './user-create';
import { ProfileCreate } from './profile-create';
import { RelationshipsCreate } from './relationships-create';
import { EquipmentsCreate } from './equipments-create';
import { ExperiencesCreate } from './experiences-create';

type EmployeeCreateDialogProps = {
  trigger: JSX.Element;
}

type Step = 'user'
  | 'profile'
  | 'relationships'
  | 'equipments'
  | 'experiences'
  | 'educations'
  | 'success';

function EmployeeCreateDialog({
  trigger
}: EmployeeCreateDialogProps): JSX.Element {
  const [step, setStep] = useState<Step>('user');
  const [user, setUser] = useState<User>();

  const renderStep = (step: Step) => {
    switch (step) {
      case 'user':
        return <UserCreate setStep={setStep} setUser={setUser} />;
      case 'profile':
        return user ? <ProfileCreate setStep={setStep} user={user} /> : null;
      case 'relationships':
        return user ? <RelationshipsCreate setStep={setStep} user={user} /> : null;
      case 'equipments':
        return user ? <EquipmentsCreate setStep={setStep} user={user} /> : null;
      case 'experiences':
        return user ? <ExperiencesCreate setStep={setStep} user={user} /> : null;
      case 'success':
        return user ? <SuccessModal setStep={setStep} user={user} /> : null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-auto">
        {renderStep(step)}
      </DialogContent>
    </Dialog>
  );
}

export {
  type Step,
  EmployeeCreateDialog,
};
