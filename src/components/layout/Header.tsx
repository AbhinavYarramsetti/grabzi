
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';
import { Heart, Menu, Puzzle, Trophy, User as UserIcon, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { useApp } from '@/components/AppProvider';


function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Puzzle className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground">GrabZi</span>
    </Link>
  );
}

export default function Header() {
  const { user, isUserLoading } = useUser();
  const { setShowLocationModal } = useApp();
  const auth = useAuth();
  const router = useRouter();


  const handleLogout = async () => {
    if(auth) {
      await auth.signOut();
    }
    router.push('/');
  };

  const navLinks = [
    { href: '/#deals', label: 'Deals' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ];
  
  if (user) {
      navLinks.push({ href: '/profile', label: 'Profile' });
  }


  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Logo />
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
            prefetch={false}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Logo />
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button variant="outline" size="sm" onClick={() => setShowLocationModal(true)}>
            <MapPin className="h-4 w-4 mr-2" />
            Change Location
        </Button>
        {isUserLoading ? (
           <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} />}
                  <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/profile#my-deals')}>
                <Heart className="mr-2 h-4 w-4" />
                <span>My Deals</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/leaderboard')}>
                 <Trophy className="mr-2 h-4 w-4" />
                <span>Leaderboard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push('/login')} variant="accent">Login</Button>
        )}
      </div>
    </header>
  );
}
