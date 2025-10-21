import CompanionForm from '@/components/CompanionForm';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { newCompanionPermissions } from '@/lib/actions/companion.actions';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
const Page = async () => {
  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="w-full items-center justify-center min-md:w-2/3 min-lg:max-w-2xl">
      {canCreateCompanion ? (
        <article className="flex w-full flex-col gap-4">
          <h1>Companion Builder</h1>
          <Suspense
            fallback={
              <div>
                <Spinner variant="ring" size="lg" />
              </div>
            }
          >
            <CompanionForm />
          </Suspense>
        </article>
      ) : (
        <article className="companion-limit w-full">
          <Image
            src={`/images/limit.svg`}
            className="dark:invert"
            alt="companion limit"
            width={360}
            height={230}
            priority
          />
          <div className="cta-badge">Upgrade Your Plan</div>
          <h1>You have reached your limit</h1>
          <p>
            You have reached your companion limit, upgrade to create more
            companions and access premium features
          </p>
          <Link href={'/subscription'}>
            <Button variant="default" className="w-full cursor-pointer gap-2">
              Upgrade my plan
            </Button>
          </Link>
        </article>
      )}
    </main>
  );
};

export default Page;
