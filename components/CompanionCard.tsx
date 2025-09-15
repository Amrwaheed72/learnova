import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import NotAuthenticated from './NotAuthenticated';
import { auth, currentUser } from '@clerk/nextjs/server';

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
    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex items-center justify-between">
                <div className="subject-badge">{subject}</div>
                <Button
                    variant={'link'}
                    size={'icon'}
                    className="companion-bookmark"
                >
                    <Image
                        src={'/icons/bookmark.svg'}
                        alt="bookmark"
                        width={12.5}
                        height={15}
                    />
                </Button>
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
            <NotAuthenticated
                href={`/companions/${id}`}
                label="Launch Lesson"
                userId={userId}
                icon=""
            />
            {/* <Link href={`/companions/${id}`} className="w-full">
                <Button
                    variant={'ghost'}
                    className="w-full cursor-pointer bg-black text-gray-200 hover:bg-black hover:text-gray-200 focus:bg-black focus:text-gray-200 active:bg-black active:text-gray-200 dark:bg-black dark:text-gray-200 dark:hover:bg-black dark:hover:text-gray-200 dark:focus:bg-black dark:focus:text-gray-200 dark:active:bg-black dark:active:text-gray-200"
                >
                    Launch Lesson
                </Button>
            </Link> */}
        </article>
    );
};

export default CompanionCard;
