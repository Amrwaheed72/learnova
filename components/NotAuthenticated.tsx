import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Props {
  userId?: string | null;
  href: string;
  label: string;
  icon?: string;
}
function NotAuthenticated({ userId, href, label, icon }: Props) {
  return (
    <Dialog>
      {userId ? (
        <Link href={href}>
          <Button
            variant="default"
            className="w-full cursor-pointer gap-2 dark:bg-black dark:text-white"
          >
            {icon && <Image  loading='lazy' src={icon} alt={label} width={12} height={12} />}
            <p>{label}</p>
          </Button>
        </Link>
      ) : (
        <>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="cursor-pointer gap-2 dark:bg-black dark:text-white"
            >
              {icon && <Image  loading='lazy' src={icon} alt={label} width={12} height={12} />}
              <p>{label}</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in is required!</DialogTitle>
              <DialogDescription>
                You must sign in to perform this action.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant={'outline'}>Cancel</Button>
              <Link href={'/sign-in'}>
                <Button>Signin</Button>
              </Link>
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
   
  );
}

export default NotAuthenticated;
