import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getRecentSession } from '@/lib/actions/companion.actions';
import { cn, getSubjectColor } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface Props {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = async ({ title, companions, classNames }: Props) => {
    const { companions: recentCompanions, error: errorRecent } =
        await getRecentSession();
    const { userId } = await auth();

    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="text-3xl font-bold">{title ?? 'Recent Sessions'}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/3 text-lg">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-right text-lg">
                            Duration
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {recentCompanions?.map(
                        ({ id, subject, topic, duration, name }) => (
                            <TableRow key={id}>
                                <TableCell className="font-medium">
                                    {userId ? (
                                        // ✅ User is logged in → go to session page directly
                                        <Link href={`/companions/${id}`}>
                                            <div className="flex cursor-pointer items-center gap-2">
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
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-2xl font-bold">
                                                        {name}
                                                    </p>
                                                    <p className="text-lg">
                                                        {topic}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ) : (
                                        // ❌ User NOT logged in → show alert dialog
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <div className="flex cursor-pointer items-center gap-2">
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
                                                    <div className="flex flex-col gap-2">
                                                        <p className="text-2xl font-bold">
                                                            {name}
                                                        </p>
                                                        <p className="text-lg">
                                                            {topic}
                                                        </p>
                                                    </div>
                                                </div>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Sign in required!
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        You must sign in to view
                                                        this session.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction asChild>
                                                        <Link href="/sign-in">
                                                            Sign in
                                                        </Link>
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
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
                                            {duration}{' '}
                                            <span className="max-md:hidden">
                                                mins
                                            </span>
                                        </p>
                                        <Image
                                            src="icons/clock.svg"
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

export default CompanionsList;
