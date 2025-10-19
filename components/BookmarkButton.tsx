'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { addBookmark, removeBookmark } from '@/lib/actions/companion.actions';
import { useState, useTransition } from 'react';

import Link from 'next/link';
import { Spinner } from './ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const BookmarkButton = ({
  companionId,
  userId,
  isBookmarked: initialIsBookmarked,
}: {
  companionId: string;
  isBookmarked: boolean;
  userId: string | null;
}) => {
  const [pending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleBookmark = () => {
    startTransition(async () => {
      try {
        const result = isBookmarked
          ? await removeBookmark(companionId)
          : await addBookmark(companionId);

        setIsBookmarked(result);
        toast.success(
          result
            ? 'Companion saved successfully'
            : 'Companion unsaved successfully',
        );
      } catch (error) {
        console.error(error);
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={toggleBookmark}
          variant="link"
          size="icon"
          className="companion-bookmark"
        >
          {pending ? (
            <Spinner variant="ring" size="sm" />
          ) : (
            <Image
              src={`${isBookmarked ? '/icons/bookmark-filled.svg' : '/icons/bookmark.svg'}`}
              alt="bookmark"
              width={12.5}
              height={15}
              loading='lazy'
            />
          )}
        </Button>
      </DialogTrigger>
      {!userId && (
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
      )}
    </Dialog>
  );
};

export default BookmarkButton;
