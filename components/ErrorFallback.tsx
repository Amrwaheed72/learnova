'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
    title?: string;
    message?: string ;
    reset?: () => void;
}

function ErrorFallback({
    title = 'Something went wrong',
    message = 'An unexpected error occurred. Please try again later.',
    reset,
}: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <AlertTriangle
                className="h-12 w-12 text-red-500"
                strokeWidth={1.5}
            />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="max-w-sm text-gray-500">{message}</p>

            {reset && (
                <Button onClick={reset} className="mt-4">
                    Try Again
                </Button>
            )}
        </div>
    );
}
export default ErrorFallback