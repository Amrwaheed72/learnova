'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import ToolTipComponent from './ToolTipComponent';

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
    <ToolTipComponent
      toolTipContent={`Change to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Button
        className="cursor-pointer"
        onClick={handleToggleTheme}
        variant="outline"
        size="icon"
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </Button>
    </ToolTipComponent>
  );
}
