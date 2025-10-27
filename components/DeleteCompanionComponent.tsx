'use client';
import { Button } from './ui/button';

import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useTransition } from 'react';
import { Spinner } from './ui/spinner';
import { DeleteCompanion } from '@/lib/actions/companions';

interface Props {
  companionId: string;
  children: React.ReactNode;
}
const DeleteCompanionComponent = ({ companionId, children }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await DeleteCompanion({ companionId });
        toast.success('Companion deleted successfully');
      } catch (error) {
        toast.error('Could not delete companion, try again later');
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure You want to delete it?</DialogTitle>
          <DialogDescription>this action can not be undone!</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant={'outline'}>Cancel</Button>
          <Button variant={'destructive'} onClick={handleDelete}>
            {isPending ? <Spinner size="sm" variant="ring" /> : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCompanionComponent;
