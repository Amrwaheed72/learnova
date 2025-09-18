import AnimatedWrapper from '@/components/AnimateWrapper';
import CallToAction from '@/components/CallToAction';
import CompanionCardContainer from '@/components/CompanionCardContainer';
import CompanionsList from '@/components/CompanionsList';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';
const Page = async () => {
    return (
        <AnimatedWrapper>
            <div className="flex flex-col gap-4">
                <h1>Popular Companions</h1>
                <Suspense
                    fallback={
                        <div className="flex h-[250px] w-full items-center justify-center">
                            <Spinner size="md" variant="ring" />
                        </div>
                    }
                >
                    <CompanionCardContainer />
                </Suspense>
                <section className="home-section">
                    <Suspense
                        fallback={
                            <div className="flex h-[50vh] flex-1 items-center justify-center">
                                <Spinner size="lg" variant="ring" />
                            </div>
                        }
                    >
                        <CompanionsList
                            title="Recently Completed Sessions"
                            classNames="w-2/3 max-lg:w-full"
                        />
                    </Suspense>
                    <CallToAction />
                </section>
            </div>
        </AnimatedWrapper>
    );
};

export default Page;
