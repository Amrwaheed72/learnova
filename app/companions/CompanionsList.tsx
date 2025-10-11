// CompanionsList.tsx
import CompanionCard from '@/components/CompanionCard';
import Empty from '@/components/Empty';
import { getAllCompanions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function CompanionsList({
  subject,
  topic,
}: {
  subject: string | string[];
  topic: string | string[];
}) {
  const { companions } = await getAllCompanions({
    limit: 8,
    subject,
    topic,
  });

  if (!companions || companions.length === 0) {
    return (
      <Empty
        action={
          <Link className="flex gap-1 hover:underline" href="/companions/new">
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
