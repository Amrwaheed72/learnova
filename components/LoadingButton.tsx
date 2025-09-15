'use client'
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

const LoadingButton = () => {
    const { pending } = useFormStatus();
    console.log(pending);
    return (
        <Button type="submit" className="w-full cursor-pointer">
            {pending ? (
                <>
                    <Spinner size="sm" variant="ring" />
                    Building Your Companion
                </>
            ) : (
                'Build Your Companion'
            )}
        </Button>
    );
};
export default LoadingButton;
