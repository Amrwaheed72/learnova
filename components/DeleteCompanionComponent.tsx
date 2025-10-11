'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import ToolTipComponent from './ToolTipComponent';
import { Eraser } from 'lucide-react';
import { DeleteCompanion } from '@/lib/actions/companion.actions';
import { toast } from 'sonner';
interface Props {
  userId: string;
  companionId: string;
}
const DeleteCompanionComponent = ({ userId, companionId }: Props) => {
  const handleDelete = async () => {
    await DeleteCompanion({ userId, companionId });
    setTimeout(() => {
      toast('Companion Deleted Successfully');
    }, 1000);
  };
  return (
    <div className="flex w-full justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <ToolTipComponent toolTipContent="Delete this companion">
            <Button className="cursor-pointer" variant={'outline'}>
              <Eraser />
            </Button>
          </ToolTipComponent>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure You want to delete it?
            </AlertDialogTitle>
            <AlertDialogDescription>
              this action can not be undone!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={handleDelete}
                variant={'destructive'}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCompanionComponent;
