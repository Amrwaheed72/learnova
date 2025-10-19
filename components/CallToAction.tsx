import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import NotAuthenticated from './NotAuthenticated';
import { Button } from './ui/button';
import Link from 'next/link';
const CallToAction = async () => {
  const { userId } = await auth();
  console.log(userId);

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
      <Image src={`/images/cta.svg`} alt="cta" width={362} height={232} />
      <NotAuthenticated
        icon="/icons/plus.svg"
        label="Build a New Companion"
        href={'/companions/new'}
        userId={userId}
      />
    </section>
  );
};

export default CallToAction;
