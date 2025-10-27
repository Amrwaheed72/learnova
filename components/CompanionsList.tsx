import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRecentSession } from '@/lib/actions/userOperations';
import { cn, getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import LoginAlert from './LoginAlert';

interface Props {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = async ({ title, classNames }: Props) => {
  const { companions: recentCompanions } = await getRecentSession();

  return (
    <article className={cn('companion-list', classNames)}>
      <h2 className="text-xl font-bold sm:text-3xl">
        {title ?? 'Recent Sessions'}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg sm:text-xl">Lessons</TableHead>
            <TableHead className="text-lg sm:text-xl">Subject</TableHead>
            <TableHead className="text-right text-lg sm:text-xl">
              Duration
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recentCompanions.length === 0 ? (
            <TableRow>
              <TableCell>
                <p className="mx-auto w-full text-lg sm:text-2xl">
                  No recent Companions
                </p>
              </TableCell>
            </TableRow>
          ) : (
            recentCompanions?.map(({ id, subject, topic, duration, name }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  <LoginAlert
                    href={`/companions/${id}`}
                    message="view this session"
                  >
                    <div className="flex cursor-pointer items-center gap-2">
                      <div
                        className="flex size-[72px] items-center justify-center rounded-lg max-md:hidden"
                        style={{
                          backgroundColor: getSubjectColor(subject),
                        }}
                      >
                        <Image
                          src={`/icons/${subject}.webp`}
                          alt={subject}
                          width={35}
                          priority
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold sm:text-2xl">{name}</p>
                        <p className="text-sm text-gray-400 sm:text-lg">
                          {topic}
                        </p>
                      </div>
                    </div>
                  </LoginAlert>
                </TableCell>

                <TableCell>
                  <div className="subject-badge-table w-fit max-md:hidden">
                    {subject}
                  </div>
                  <div
                    className="flex w-fit items-center justify-center rounded-lg p-2 md:hidden"
                    style={{
                      backgroundColor: getSubjectColor(subject),
                    }}
                  >
                    <Image
                      src={`/icons/${subject}.webp`}
                      alt={subject}
                      width={18}
                      priority
                      height={18}
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex w-full items-center justify-center gap-2 md:justify-end">
                    <p className="text-2xl">
                      {duration} <span className="max-md:hidden">mins</span>
                    </p>
                    <Image
                      src="/icons/clock.webp"
                      alt="minutes"
                      width={14}
                      height={14}
                      priority
                      className="md:hidden"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
