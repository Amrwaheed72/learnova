import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import { getSubjectColor } from '@/lib/utils';
import BookmarkButton from './BookmarkButton';
import { getUserBookmarks } from '@/lib/actions/companion.actions';
import { Button } from './ui/button';
import LoginAlert from './LoginAlert';

interface Props {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color: string;
}

const CompanionCard = async ({
  id,
  subject,
  name,
  topic,
  duration,
  color,
}: Props) => {
  const { userId } = await auth();

  const { companions } = await getUserBookmarks(userId);

  const isBookmarked = companions.some((c) => c.id === id);
  return (
    <div
      className="companion-card"
      style={{ backgroundColor: getSubjectColor(subject) }}
    >
      <div className="flex items-center justify-between">
        <div className="subject-badge">{subject}</div>
        <BookmarkButton
          userId={userId}
          isBookmarked={isBookmarked}
          companionId={id}
        />
      </div>
      <h2 className="text-2xl font-bold dark:text-black">{name} </h2>
      <p className="text-sm text-black">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src={'/icons/clock.svg'}
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm text-black">{duration} minutes</p>
      </div>
      <div className="w-full">
        <LoginAlert message="view this session" href={`/companions/${id}`}>
          <Button className="w-full">Launch Lesson</Button>
        </LoginAlert>
      </div>
    </div>
  );
};

export default CompanionCard;
