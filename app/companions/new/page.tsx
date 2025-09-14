import CompanionForm from '@/components/CompanionForm';

const Page = () => {
    return (
        <main className="items-center justify-center min-md:w-2/3 min-lg:max-w-2xl">
            <article className="flex w-full flex-col gap-4">
                <h1>Companion Builder</h1>
                <CompanionForm />
            </article>
        </main>
    );
};

export default Page;
