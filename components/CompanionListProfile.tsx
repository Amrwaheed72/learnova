'use client';

import { cn, getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Eraser } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import DeleteCompanionComponent from './DeleteCompanionComponent';

interface Props {
  title: string;
  companions?: Companion[];
  classNames?: string;
  type: string;
}

const CompanionListProfile = ({
  title,
  companions,
  classNames,
  type,
}: Props) => {
  const { user } = useUser();
  return (
    <article className={cn('companion-list', classNames)}>
      <h2 className="text-xl font-bold sm:text-3xl">{title}</h2>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg sm:text-xl">Lessons</TableHead>
            <TableHead className="text-lg sm:text-xl">Subject</TableHead>
            <TableHead className="text-lg sm:text-xl">Duration</TableHead>
            {type === 'mine' && (
              <TableHead className="text-lg sm:text-xl">Options</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.length === 0 ? (
            <TableRow>
              <TableCell className="mx-auto w-full text-2xl">
                No recent Companions
              </TableCell>
            </TableRow>
          ) : (
            companions?.map(({ id, subject, topic, duration, name }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-2">
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
                          height={35}
                          priority
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-bold sm:text-2xl">{name}</p>
                        <p className="text-sm text-gray-400 sm:text-lg">
                          {topic}
                        </p>
                      </div>
                    </div>
                  </Link>
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
                      height={18}
                      priority
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex w-full items-center justify-center gap-2 md:justify-end">
                    <p className="text-2xl">
                      {' '}
                      {duration} {'  '}
                      <span className="max-md:hidden">mins</span>
                    </p>
                    <Image
                      src={`/icons/clock.webp`}
                      alt="minutes"
                      width={14}
                      height={14}
                      priority
                      className="md:hidden"
                    />
                  </div>
                </TableCell>
                {type === 'mine' && (
                  <TableCell>
                    <div>
                      <DeleteCompanionComponent
                        companionId={id}
                      >
                        <Button className="cursor-pointer" variant={'outline'}>
                          <Eraser />
                        </Button>
                      </DeleteCompanionComponent>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionListProfile;
