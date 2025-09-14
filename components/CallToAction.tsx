import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const CallToAction = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start Learning Your Way</div>
            <h2 className="text-3xl font-bold">
                Build and Personalize Learning Companions
            </h2>
            <p>
                Pick a name, subject, voice, &personality - and start learning
                through learning conversations that feal natural and fun
            </p>
            <Image src={`/images/cta.svg`} alt="cta" width={362} height={232} />
            <Button variant={'default'} className='dark:bg-black dark:text-white'>
                <Image src={`/icons/plus.svg`} alt='plus' width={12} height={12} />
                <Link href={'/companions/new'}>
                <p>Build a New Companions</p>
                    </Link>
            </Button>
        </section>
    );
};

export default CallToAction;
