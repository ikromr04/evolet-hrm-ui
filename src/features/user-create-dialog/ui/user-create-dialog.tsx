import { JSX, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui';
import { User } from '@/entities/user';
import { UserCreatedMessage } from './user-created-message';
import { UserCreateForm } from './user-create-form';
import { UserProfileCreateForm } from './user-profile-create-form';
import { UserRelationshipsCreateForm } from './user-relationships-create-form';
import { UserEquipmentCreateForms } from './user-equipment-create-forms';
import { UserEducationsCreateForms } from './user-education-create-forms';
import { UserAvatarCreateForm } from './user-avatar-create-form';
import { UserExperienceCreateForms } from './user-experience-create-forms';

type UserCreateDialogProps = {
  trigger: JSX.Element;
}

type Step = 'user-create'
  | 'user-avatar'
  | 'user-profile'
  | 'user-relationships'
  | 'user-equipments'
  | 'user-experiences'
  | 'user-educations'
  | 'user-created-message';

function UserCreateDialog({
  trigger
}: UserCreateDialogProps): JSX.Element {
  const [step, setStep] = useState<Step>('user-create');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>();

  const renderStep = (step: Step) => {
    switch (step) {
      case 'user-create':
        return <UserCreateForm setStep={setStep} setUser={setUser} />;
      case 'user-avatar':
        return user ? <UserAvatarCreateForm setStep={setStep} user={user} /> : null;
      case 'user-profile':
        return user ? <UserProfileCreateForm setStep={setStep} user={user} /> : null;
      case 'user-relationships':
        return user ? <UserRelationshipsCreateForm setStep={setStep} user={user} /> : null;
      case 'user-equipments':
        return user ? <UserEquipmentCreateForms setStep={setStep} user={user} /> : null;
      case 'user-experiences':
        return user ? <UserExperienceCreateForms setStep={setStep} user={user} /> : null;
      case 'user-educations':
        return user ? <UserEducationsCreateForms setStep={setStep} user={user} /> : null;
      case 'user-created-message':
        return user ? <UserCreatedMessage setStep={setStep} user={user} setIsOpen={setIsOpen} /> : null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
  UserCreateDialog,
};
