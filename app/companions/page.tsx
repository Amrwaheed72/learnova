import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import CompanionsList from './CompanionsList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ToolTipComponent from '@/components/ToolTipComponent';
import AnimatedWrapper from '@/components/AnimateWrapper';
import LoginAlert from '@/components/LoginAlert';

const Page = async ({ searchParams }: SearchParams) => {
  const filter = await searchParams;
  const subject = filter.subject ?? '';
  const topic = filter.topic ?? '';

  return (
    <div className="flex w-full flex-col items-start gap-8">
      <section className="flex w-full flex-col justify-start gap-8 sm:flex-row sm:justify-between">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <LoginAlert message="Build new companion" href="/companions/new">
            <ToolTipComponent toolTipContent={'Build new Companion'}>
              <Button className="cursor-pointer" variant={'outline'}>
                <Plus />
              </Button>
            </ToolTipComponent>
          </LoginAlert>
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
        <AnimatedWrapper type="none">
          <CompanionsList subject={subject} topic={topic} />
        </AnimatedWrapper>
      </Suspense>
    </div>
  );
};

export default Page;
