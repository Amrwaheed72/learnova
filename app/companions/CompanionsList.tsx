// CompanionsList.tsx
import CompanionCard from '@/components/CompanionCard';
import Empty from '@/components/Empty';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ErrorFallback from '@/components/ErrorFallback';

export default async function CompanionsList({
    subject,
    topic,
}: {
    subject: string | string[];
    topic: string | string[];
}) {
    const { companions, error } = await getAllCompanions({
        limit: 8,
        subject,
        topic,
    });

    if (error) {
        return (
            <ErrorFallback message="Error loading companions, please refresh the page, or try again later" />
        );
    }

    if (!companions || companions.length === 0) {
        return (
            <Empty
                action={
                    <Link
                        className="flex gap-1 hover:underline"
                        href="/companions/new"
                    >
                        or Create a New Companion <ArrowRight />
                    </Link>
                }
            />
        );
    }

    return (
        <section className="companions-grid">
            {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                />
            ))}
        </section>
    );
}
