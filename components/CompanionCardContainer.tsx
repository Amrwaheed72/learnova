import { getAllCompanions } from '@/lib/actions/companion.actions';
import CompanionCard from './CompanionCard';
import Empty from './Empty';

const CompanionCardContainer = async () => {
    const { companions } = await getAllCompanions({ limit: 3 });

    if(!companions||companions.length===0){
        <Empty message='try to create some companions' />
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
