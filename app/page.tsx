import CallToAction from '@/components/CallToAction';
import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import { recentSessions } from '@/constants';

const Page = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h1>Popular Companions</h1>
            <section className="home-section">
                <CompanionCard
                    id="123"
                    name="Neura The Brainy Explorer"
                    topic="Neural Network of The Brain"
                    subject="science"
                    duration={45}
                    color="#ffda6e"
                />
                <CompanionCard
                    id="123"
                    name="Neura The Brainy Explorer"
                    topic="Neural Network of The Brain"
                    subject="science"
                    duration={45}
                    color="#6e95ff"
                />
                <CompanionCard
                    id="123"
                    name="Neura The Brainy Explorer"
                    topic="Neural Network of The Brain"
                    subject="science"
                    duration={45}
                    color="#6eff89"
                />
            </section>
            <section className="home-section">
                <CompanionsList
                    title="Recently Completed Sessions"
                    companions={recentSessions}
                    classNames='w-2/3 max-lg:w-full'
                />
                <CallToAction />
            </section>
        </div>
    );
};

export default Page;
