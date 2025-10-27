'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { addBookmark, removeBookmark } from '@/lib/actions/companion.actions';
import { useState, useTransition } from 'react';
import { Spinner } from './ui/spinner';
import dynamic from 'next/dynamic';
const LoginAlert = dynamic(() => import('./LoginAlert'));
const BookmarkButton = ({
  companionId,
  isBookmarked: initialIsBookmarked,
}: {
  companionId: string;
  isBookmarked: boolean;
  userId: string | null;
}) => {
  const [isPending, startTransition] = useTransition();
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
    <LoginAlert message="save this session">
      <Button
        onClick={toggleBookmark}
        variant="link"
        size="icon"
        className="companion-bookmark"
      >
        {isPending ? (
          <Spinner variant="ring" size="sm" />
        ) : (
          <Image
            src={`${isBookmarked ? '/icons/bookmark-filled.webp' : '/icons/bookmark.webp'}`}
            alt="bookmark"
            width={12.5}
            height={15}
            priority
          />
        )}
      </Button>
    </LoginAlert>
  );
};

export default BookmarkButton;
