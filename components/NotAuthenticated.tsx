import Link from 'next/link';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Props {
  userId?: string | null;
  href: string;
  label: string;
  icon: string;
}
function NotAuthenticated({ userId, href, label, icon }: Props) {
  return (
    <AlertDialog>
      {userId ? (
        // ✅ If logged in, just navigate
        <Link href={href}>
          <Button
            variant="default"
            className="w-full cursor-pointer gap-2 dark:bg-black dark:text-white"
          >
            {icon && <Image src={icon} alt={label} width={12} height={12} />}
            <p>{label}</p>
          </Button>
        </Link>
      ) : (
        // ❌ If not logged in, open alert dialog
        <>
          <AlertDialogTrigger asChild>
            <Button
              variant="default"
              className="cursor-pointer gap-2 dark:bg-black dark:text-white"
            >
              {icon && <Image src={icon} alt={label} width={12} height={12} />}
              <p>{label}</p>
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign in required!</AlertDialogTitle>
              <AlertDialogDescription>
                You must sign in to perform this action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="/sign-in">Sign in</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </>
      )}
    </AlertDialog>
  );
}

export default NotAuthenticated;
