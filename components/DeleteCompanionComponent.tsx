import { Button } from './ui/button';
import ToolTipComponent from './ToolTipComponent';
import { Eraser } from 'lucide-react';
import { DeleteCompanion } from '@/lib/actions/companion.actions';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';

const AlertDialog = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialog),
);
const AlertDialogContent = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogContent),
);
const AlertDialogHeader = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogHeader),
);
const AlertDialogTitle = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogTitle),
);
const AlertDialogDescription = dynamic(() =>
  import('@/components/ui/alert-dialog').then(
    (mod) => mod.AlertDialogDescription,
  ),
);
const AlertDialogFooter = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogFooter),
);
const AlertDialogCancel = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogCancel),
);
const AlertDialogAction = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogAction),
);
const AlertDialogTrigger = dynamic(() =>
  import('@/components/ui/alert-dialog').then((mod) => mod.AlertDialogTrigger),
);
interface Props {
  userId: string | null;
  companionId: string;
}
const DeleteCompanionComponent = ({ userId, companionId }: Props) => {
  const handleDelete = async () => {
    await DeleteCompanion({ userId, companionId });

    toast('Companion Deleted Successfully');
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
