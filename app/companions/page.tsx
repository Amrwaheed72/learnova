import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import CompanionsList from './CompanionsList';

const Page = async ({ searchParams }: SearchParams) => {
    const filter = await searchParams;
    const subject = filter.subject ?? '';
    const topic = filter.topic ?? '';

    return (
        <div className="flex w-full flex-col items-start gap-8">
            <section className="flex w-full flex-col justify-start sm:flex-row sm:justify-between">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>

            <Suspense
                fallback={
                    <div className="flex h-[50vh] w-full items-center justify-center">
                        <Spinner size="xl" variant="ring" />
                    </div>
                }
            >
                <CompanionsList subject={subject} topic={topic} />
            </Suspense>
        </div>
    );
};

export default Page;
