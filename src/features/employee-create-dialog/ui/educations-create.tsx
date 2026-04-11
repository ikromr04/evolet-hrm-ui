import { Dispatch, JSX, SetStateAction, useState } from 'react';
import { Step } from './employee-create-dialog';
import { ArrowRight, Plus } from 'lucide-react';
import { User } from '@/entities/user';
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';
import { EducationCreateForm } from './education-create-form';

type EducationsCreateProps = {
  setStep: Dispatch<SetStateAction<Step>>;
  user: User;
}

function EducationsCreate({
  setStep,
  user,
}: EducationsCreateProps): JSX.Element {
  const [formIds, setFormIds] = useState([1]);
  const [hasSaved, setHasSaved] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle className="pr-10 leading-[1.2]">
          Образование ({user.surname} {user.name})
        </DialogTitle>
        <DialogDescription>
          Добавьте информацию об образовании сотрудника
        </DialogDescription>
      </DialogHeader>

      {formIds.map((formId, index) => (
        <div key={formId}>
          <div className="ml-1">Образование {index + 1}</div>
          <div className="border rounded-xl p-2 -m-2 mt-1">
            <EducationCreateForm
              user={user}
              removable={formIds.length !== 1 ? true : false}
              onRemove={() => setFormIds((prev) => prev.filter((id) => id !== formId))}
              onSave={() => setHasSaved(true)}
            />
          </div>
        </div>
      ))}

      <Button
        className="ml-auto"
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => setFormIds((prev) => [...prev, prev[prev.length - 1] + 1])}
      >
        <Plus size={16} /> Добавить
      </Button>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep('success')}
        >
          {!hasSaved ? 'Пропустить' : 'Далее'}
          <ArrowRight size={16} />
        </Button>
      </DialogFooter>
    </div>
  );
}

export {
  EducationsCreate,
};
