import {
  getUserBookmarks,
  getUserCompanions,
  getUserSessions,
} from '@/lib/actions/companion.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import AnimatedWrapper from '@/components/AnimateWrapper';
import dynamic from 'next/dynamic';

const Accordion = dynamic(() =>
  import('@/components/ui/accordion').then((mod) => mod.Accordion),
);
const AccordionContent = dynamic(() =>
  import('@/components/ui/accordion').then((mod) => mod.AccordionContent),
);
const AccordionItem = dynamic(() =>
  import('@/components/ui/accordion').then((mod) => mod.AccordionItem),
);
const AccordionTrigger = dynamic(() =>
  import('@/components/ui/accordion').then((mod) => mod.AccordionTrigger),
);
const CompanionListProfile = dynamic(
  () => import('@/components/CompanionListProfile'),
);
const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const { UserCompanions } = await getUserCompanions(user.id);
  const { companions: sessionHistory } = await getUserSessions(user.id);
  const { companions: BookMarked } = await getUserBookmarks(user.id);

  return (
    <AnimatedWrapper type="none">
      <div className="mx-auto min-lg:w-3/4">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col">
          <div className="flex items-center gap-4">
            <Image
              src={user?.imageUrl}
              alt={user?.firstName ?? 'user'}
              width={110}
              height={110}
              className="rounded-full"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-muted-foreground text-sm">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-fit flex-col gap-2 rounded-lg border border-black p-3">
              <div className="flex items-center gap-2">
                <Image
                  src={`/icons/check.svg`}
                  alt="checkmark"
                  width={22}
                  height={22}
                />
                <p className="text-2xl font-bold">{sessionHistory.length}</p>
              </div>
              <div>Lessons Completed</div>
            </div>
            <div className="flex h-fit flex-col gap-2 rounded-lg border border-black p-3">
              <div className="flex items-center gap-2">
                <Image
                  src={`/icons/cap.svg`}
                  alt="cap"
                  width={22}
                  height={22}
                />
                <p className="text-2xl font-bold">{UserCompanions.length}</p>
              </div>
              <div>Companions Created</div>
            </div>
          </div>
        </div>
        <Accordion type="multiple">
          <AccordionItem value="recent">
            <AccordionTrigger className="text-2xl font-bold">
              Recent Sessions
            </AccordionTrigger>
            <AccordionContent>
              <CompanionListProfile
                companions={sessionHistory}
                title="Recent Sessions"
                type=""
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="companions">
            <AccordionTrigger className="text-2xl font-bold">
              My Companions [{UserCompanions.length}]
            </AccordionTrigger>
            <AccordionContent>
              <CompanionListProfile
                companions={UserCompanions}
                title="My Companions"
                type="mine"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bookmarks">
            <AccordionTrigger className="text-2xl font-bold">
              My Saved Companions [{BookMarked.length}]
            </AccordionTrigger>
            <AccordionContent>
              <CompanionListProfile
                companions={BookMarked}
                title="My Saved Companions"
                type=""
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </AnimatedWrapper>
  );
};

export default Page;
