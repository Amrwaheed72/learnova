'use client';

import { useTheme } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
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
    </ThemeProvider>
  );
}
