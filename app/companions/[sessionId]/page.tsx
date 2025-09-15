import { getOneCompanion } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
interface CompanionSessionPageProps {
    params: Promise<{ sessionId: string }>;
}
const Page = async ({ params }: CompanionSessionPageProps) => {
    const { sessionId } = await params;
    console.log(sessionId);
    const { companion, error } = await getOneCompanion(sessionId);
    const { subject, name, topic, duration, title } = companion;
    console.log(companion);
    const user = await currentUser();

    return (
        <div>
            <article className="rounded-border flex justify-between p-6 max-md:flex-col">
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
                            <div className="subject-badge max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden">
                    {duration}
                </div>
            </article>
        </div>
    );
};

export default Page;
