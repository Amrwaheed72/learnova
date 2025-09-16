import { getAllCompanions } from '@/lib/actions/companion.actions';
import CompanionCard from './CompanionCard';
import ErrorFallback from './ErrorFallback';

const CompanionCardContainer = async () => {
    const { companions, error } = await getAllCompanions({ limit: 3 });
    if (error) {
        return <ErrorFallback message={error.message} />;
    }

    return (
        <section className="home-section">
            {companions?.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={companion.subject}
                />
            ))}
        </section>
    );
};

export default CompanionCardContainer;
