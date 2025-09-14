'use client';

import { useTheme } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Providers({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <ClerkProvider
            appearance={{
                baseTheme: theme === 'dark' ? dark : undefined,
                variables: {
                    colorPrimary: '#fe5933',
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
}
