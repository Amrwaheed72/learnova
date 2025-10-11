'use client';

import { DollarSign, House, Library, Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { Button } from './ui/button';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home', icon: <House size={18} /> },
  { href: '/companions', label: 'Companions', icon: <Library size={18} /> },
  { href: '/my-journey', label: 'My Journey', icon: <User size={18} /> },
  { href: '/subscription', label: 'Billing', icon: <DollarSign size={18} /> },
];

const MobileNavList = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          {links.map((link, i) => (
            <div key={link.href}>
              <DropdownMenuItem asChild onSelect={handleClose}>
                <Link
                  href={link.href}
                  className="flex w-full items-center justify-between gap-2"
                >
                  <span>{link.label}</span>
                  <DropdownMenuShortcut>{link.icon}</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>

              {/* Show separator except after last item */}
              {i < links.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavList;
