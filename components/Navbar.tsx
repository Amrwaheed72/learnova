import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import Image from 'next/image';
import image from '@/public/images/logo.svg';
import NavItems from './NavItems';
import MobileNavList from './MobileNavList';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import ToolTipComponent from './ToolTipComponent';
const Navbar = () => {
    return (
        <nav className="navbar border-b-1">
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
                    <SignedOut>
                        <ToolTipComponent toolTipContent="sign in">
                            <SignInButton>
                                <Button
                                    variant={'outline'}
                                    className="cursor-pointer"
                                >
                                    <LogIn />
                                </Button>
                            </SignInButton>
                        </ToolTipComponent>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
