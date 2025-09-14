import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import Image from 'next/image';
import image from '@/public/images/logo.svg';
import NavItems from './NavItems';
import MobileNavList from './MobileNavList';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href={'/'}>
                <div className="flex cursor-pointer items-center gap-2.5">
                    <Image src={image} alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className="flex items-center gap-4 md:gap-8">
                <div className="hidden items-center gap-8 sm:flex">
                    <NavItems />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex sm:hidden">
                        <MobileNavList />
                    </div>
                    <Link href="signin">Sign In</Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
