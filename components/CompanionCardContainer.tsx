import { getAllCompanions } from '@/lib/actions/companion.actions';
import CompanionCard from './CompanionCard';
import Empty from './Empty';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedWrapper from './AnimateWrapper';

const CompanionCardContainer = async () => {
    const { companions } = await getAllCompanions({ limit: 3 });

    if (!companions || companions.length === 0) {
        return (
            <Empty
                message="try to create some companions to make them popular"
                title="No Popular Companions at this moment"
                action={
                    <Link
                        className="flex gap-1 hover:underline"
                        href="/companions/new"
                    >
                        Create a New Companion <ArrowRight />
                    </Link>
                }
            />
        );
    }

    return (
        <AnimatedWrapper type="none">
            <section className="home-section">
                {companions?.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={companion.subject}
                    />
                ))}
            </section>
        </AnimatedWrapper>
    );
};

export default CompanionCardContainer;
