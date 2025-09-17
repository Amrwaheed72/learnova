import BookmarkButton from '@/components/BookmarkButton';
import CompanionComponent from '@/components/CompanionComponent';
import {
    getOneCompanion,
    getUserBookmarks,
} from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
interface CompanionSessionPageProps {
    params: Promise<{ sessionId: string }>;
}
const Page = async ({ params }: CompanionSessionPageProps) => {
    const { sessionId } = await params;
    const { companion } = await getOneCompanion(sessionId);

    const { subject, name, topic, duration, title, voice, style, id } =
        companion;
    const user = await currentUser();
    if (!user?.id) throw new Error('you must sign in');

    const { companions } = await getUserBookmarks(user.id);

    const isBookmarked = companions.some((c) => c.id === id);
    return (
        <div className="flex flex-col gap-8">
            <article className="rounded-border flex justify-between border-black p-6 max-md:flex-col dark:border-white">
                <div className="flex items-center gap-2">
                    <div
                        className="flex size-[72px] items-center justify-center rounded-lg max-md:hidden"
                        style={{
                            backgroundColor: getSubjectColor(subject),
                        }}
                    >
                        <Image
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={35}
                            height={35}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">{name}</p>
                            <div className="subject-badge-table max-sm:text-xs">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-2">
                    <div className="rounded-lg border border-white">
                        <BookmarkButton
                            userId={user.id}
                            isBookmarked={isBookmarked}
                            companionId={id}
                        />
                    </div>
                    <div className="items-start rounded-2xl border-1 px-2 text-sm max-md:hidden dark:border-white">
                        {duration} mins
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="rounded-2xl border-1 px-2 text-sm max-md:hidden dark:border-white">
                            {voice}
                        </div>
                        <div className="rounded-2xl border-1 px-2 text-sm max-md:hidden dark:border-white">
                            {style}
                        </div>
                    </div>
                </div>
            </article>
            <CompanionComponent
                {...companion}
                companionId={sessionId}
                userName={user?.firstName}
                userImage={user?.imageUrl}
            />
        </div>
    );
};

export default Page;
