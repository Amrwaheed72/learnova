'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const handleToggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="cursor-pointer"
                    onClick={handleToggleTheme}
                    variant="outline"
                    size="icon"
                >
                    {theme === 'dark' ? <Sun /> : <Moon />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {`Change to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            </TooltipContent>
        </Tooltip>
    );
}
