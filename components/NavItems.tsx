'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/companions', label: 'Companions' },
    { href: '/my-journey', label: 'My Journey' },
];

const NavItems = () => {
    const pathname = usePathname();
    return (
        <div className="flex items-center gap-8">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.href}
                    className={`text-gray-600 dark:text-gray-300 ${pathname === link.href && 'font-semibold text-gray-800 dark:text-white'}`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default NavItems;
