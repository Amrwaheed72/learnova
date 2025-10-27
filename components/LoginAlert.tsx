'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useState } from 'react';
interface LoginAlertProps {
  message: string;
  href?: string;
  children: React.ReactNode;
}

const LoginAlert = ({ message, href, children }: LoginAlertProps) => {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (isSignedIn) {
      router.push(href);
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={handleClick}>{children}</div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in required</DialogTitle>
          <DialogDescription>You must sign in to {message}.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => router.push('/sign-in')}>Sign in</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginAlert;
