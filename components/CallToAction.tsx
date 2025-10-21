import Image from 'next/image';
import { Button } from './ui/button';
import LoginAlert from './LoginAlert';

const CallToAction = async () => {
  return (
    <section className="cta-section max-lg:order-4">
      <div className="cta-badge">Start Learning Your Way</div>
      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companions
      </h2>
      <p>
        Pick a name, subject, voice, &personality - and start learning through
        learning conversations that feal natural and fun
      </p>
      <Image
        src={`/images/cta.svg`}
        priority
        alt="cta"
        width={362}
        height={362}
      />
      <LoginAlert message="build new companion" href="/companions/new">
        <Button>
          <Image
            priority
            src={'/icons/plus.svg'}
            className="dark:invert"
            alt="plus"
            width={12}
            height={12}
          />{' '}
          Build a New Companion
        </Button>
      </LoginAlert>
    </section>
  );
};

export default CallToAction;
