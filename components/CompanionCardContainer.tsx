import { getAllCompanions } from '@/lib/actions/companion.actions';
import CompanionCard from './CompanionCard';

const CompanionCardContainer = async () => {
    const { companions } = await getAllCompanions({ limit: 3 });

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
