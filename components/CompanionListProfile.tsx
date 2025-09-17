import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn, getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionListProfile = ({ title, companions, classNames }: Props) => {
    console.log(companions);
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="text-3xl font-bold">{title}</h2>
            {/* FIX 1: Add w-full and table-fixed to control table layout */}
            <Table className="w-full table-fixed">
                <TableHeader>
                    <TableRow>
                        {/* You can also adjust column widths here if needed */}
                        <TableHead className="w-[60%] text-lg">
                            Lessons
                        </TableHead>
                        <TableHead className="w-[20%] text-lg">
                            Subject
                        </TableHead>
                        <TableHead className="w-[20%] text-right text-lg">
                            Duration
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(
                        ({ id, subject, topic, duration, name }) => (
                            <TableRow key={id}>
                                <TableCell className="font-medium">
                                    {/* The overflow-hidden on the parent is important for truncate to work */}
                                    <Link
                                        href={`/companions/${id}`}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="flex size-[72px] items-center justify-center rounded-lg max-md:hidden"
                                                style={{
                                                    backgroundColor:
                                                        getSubjectColor(
                                                            subject,
                                                        ),
                                                }}
                                            >
                                                <Image
                                                    src={`/icons/${subject}.svg`}
                                                    alt={subject}
                                                    width={35}
                                                    height={35}
                                                />
                                            </div>
                                            {/* FIX 2: Handle potential text overflow */}
                                            <div className="flex flex-col gap-2 overflow-hidden">
                                                <p className="truncate text-2xl font-bold">
                                                    {name}
                                                </p>
                                                <p className="truncate text-lg">
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
                                            backgroundColor:
                                                getSubjectColor(subject),
                                        }}
                                    >
                                        <Image
                                            src={`/icons/${subject}.svg`}
                                            alt={subject}
                                            width={18}
                                            height={18}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex w-full items-center justify-center gap-2 md:justify-end">
                                        <p className="text-2xl">
                                            {' '}
                                            {duration} {'  '}
                                            <span className="max-md:hidden">
                                                mins
                                            </span>
                                        </p>
                                        <Image
                                            src={`icons/clock.svg`}
                                            alt="minutes"
                                            width={14}
                                            height={14}
                                            className="md:hidden"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </article>
    );
};

export default CompanionListProfile;
