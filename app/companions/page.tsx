import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import CompanionsList from './CompanionsList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ToolTipComponent from '@/components/ToolTipComponent';
import AnimatedWrapper from '@/components/AnimateWrapper';

const Page = async ({ searchParams }: SearchParams) => {
    const filter = await searchParams;
    const subject = filter.subject ?? '';
    const topic = filter.topic ?? '';

    return (
        <div className="flex w-full flex-col items-start gap-8">
            <section className="flex w-full gap-8 flex-col justify-start sm:flex-row sm:justify-between">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <ToolTipComponent toolTipContent={'Add new Companion'}>
                        <Link href={'/companions/new'}>
                            <Button
                                className="cursor-pointer"
                                variant={'outline'}
                            >
                                <Plus />
                            </Button>
                        </Link>
                    </ToolTipComponent>
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
                <AnimatedWrapper type='none'>
                    <CompanionsList subject={subject} topic={topic} />
                </AnimatedWrapper>
            </Suspense>
        </div>
    );
};

export default Page;
