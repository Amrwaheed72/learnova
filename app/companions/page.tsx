import CompanionCard from '@/components/CompanionCard';
import Empty from '@/components/Empty';
import ErrorFallback from '@/components/ErrorFallback';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Page = async ({ searchParams }: SearchParams) => {
    const filter = await searchParams;

    const subject = filter.subject ? filter.subject : '';
    const topic = filter.topic ? filter.topic : '';

    const { companions, error } = await getAllCompanions({
        limit: 8,
        subject,
        topic,
    });
    if (error) {
        return (
            <ErrorFallback
                message={'an error occurred, please refresh the page'}
            />
        );
    }

    return (
        <div className="flex w-full flex-col items-start gap-8">
            <section className="flex w-full flex-1 flex-col justify-start gap-4">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {!companions || companions.length === 0 ? (
                    <Empty
                        action={
                            <Link
                                className="flex gap-1 hover:underline"
                                href={'/companions/new'}
                            >
                                or Create a New Companion <ArrowRight />
                            </Link>
                        }
                    />
                ) : (
                    companions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))
                )}
            </section>
        </div>
    );
};

export default Page;
