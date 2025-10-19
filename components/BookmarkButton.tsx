'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { addBookmark, removeBookmark } from '@/lib/actions/companion.actions';
import { useState, useTransition } from 'react';

import Link from 'next/link';
import { Spinner } from './ui/spinner';
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
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
            />
          )}
        </Button>
      </AlertDialogTrigger>
      {!userId && (
        <AlertDialogContent>
          <>
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
          </>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default BookmarkButton;
