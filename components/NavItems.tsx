'use client';

import { House, Library, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home', icon: <House size={18} /> },
    { href: '/companions', label: 'Companions', icon: <Library size={18} /> },
    { href: '/my-journey', label: 'My Journey', icon: <User size={18} /> },
];

const NavItems = () => {
    const pathname = usePathname();
    return (
        <div className="flex items-center gap-8">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.href}
                    className={`flex  justify-center items-center gap-2 text-gray-600 dark:text-gray-300 ${pathname === link.href && 'font-semibold text-gray-800 dark:text-white'}`}
                >
                    {link.label}
                    {link.icon}
                </Link>
            ))}
        </div>
    );
};

export default NavItems;
