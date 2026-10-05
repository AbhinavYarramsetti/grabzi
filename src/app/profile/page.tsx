
'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '@/components/layout/Header';
import { useApp } from '@/components/AppProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Utensils, Badge as BadgeIcon, TrendingUp, CircleDollarSign, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import type { Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';


function ClaimedDealCard({ transaction }: { transaction: Transaction }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const handleMarkAsUsed = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const transactionRef = doc(firestore, 'users', user.uid, 'transactions', transaction.transactionID);
      await updateDoc(transactionRef, { status: 'used' });
      toast({
        title: 'Deal Marked as Used!',
        description: `${transaction.dealTitle} has been marked as used.`,
      });
    } catch (error) {
      console.error("Error marking deal as used: ", error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not mark the deal as used. Please try again.',
      });
    } finally {
      setIsUpdating(false);
      setShowConfirm(false);
    }
  };


  const isUsed = transaction.status === 'used';

  return (
    <>
    <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will mark the deal as used and cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleMarkAsUsed} disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Confirm'}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    <Card className={`transition-all ${isUsed ? 'bg-muted/50 opacity-60' : ''}`}>
      <CardContent className="p-4 flex gap-4 items-center">
        {transaction.dealImage && (
          <Image
            src={transaction.dealImage.imageUrl}
            alt={transaction.dealTitle}
            width={80}
            height={80}
            className="rounded-md object-cover aspect-square"
            data-ai-hint={transaction.dealImage.imageHint}
          />
        )}
        <div className="flex-1">
          <h3 className="font-bold">{transaction.dealTitle}</h3>
          <p className="text-sm text-muted-foreground">{transaction.vendorName}</p>
          <div className="flex items-center gap-4 mt-2">
            <div>
              <p className="text-xs text-muted-foreground">Code</p>
              <p className="font-mono text-sm font-bold">{transaction.uniqueCode}</p>
            </div>
            {isUsed ? (
               <Badge variant="secondary" className="ml-auto">Used</Badge>
            ) : (
             <Button size="sm" onClick={() => setShowConfirm(true)} disabled={isUpdating} className="ml-auto">
                Mark as Used
             </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </>
  );
}


export default function ProfilePage() {
  const { user: profileUser, isUserLoading: isProfileLoading } = useApp();
  const { user: authUser } = useUser();
  const firestore = useFirestore();

  const transactionsQuery = useMemoFirebase(() => {
    if (!authUser || !firestore) return null;
    return collection(firestore, 'users', authUser.uid, 'transactions');
  }, [authUser, firestore]);

  const { data: transactions, isLoading: isTransactionsLoading } = useCollection<Transaction>(transactionsQuery);

  const activeDeals = useMemo(() => transactions?.filter(t => t.status !== 'used') || [], [transactions]);
  
  const foodSavedKg = useMemo(() => (profileUser?.totalDealsClaimed || 0) * 0.4, [profileUser]);


  if (isProfileLoading) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <p>Loading profile...</p>
            </div>
        </div>
    );
  }

  if (!profileUser) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
                <p className="text-muted-foreground mb-6">Log in to see your profile and impact.</p>
                <Button asChild>
                  <Link href="/login">Log In</Link>
                </Button>
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-primary/5">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="flex items-center gap-6 p-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    {profileUser.avatar && <AvatarImage src={profileUser.avatar.imageUrl} alt={profileUser.name} /> }
                    <AvatarFallback className="text-3xl">{profileUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold font-headline">{profileUser.name}</h1>
                    <p className="text-muted-foreground">{profileUser.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <BadgeIcon className="h-5 w-5 text-accent" />
                        <span className="font-semibold">{profileUser.rank}</span>
                    </div>
                </div>
            </CardContent>
          </Card>

          {/* Impact Stats */}
           <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rupees Saved</CardTitle>
                <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{profileUser.rupeesSaved.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deals Claimed</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profileUser.totalDealsClaimed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeDeals.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {/* Assuming 2.5kg of CO2 saved per kg of food */}
                <div className="text-2xl font-bold">{(foodSavedKg * 2.5).toFixed(1)} kg</div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meals Rescued</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {/* Assuming 1 meal is approx 0.5kg of food */}
                <div className="text-2xl font-bold">{Math.floor(foodSavedKg / 0.5)}</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Claimed Deals */}
          <div id="my-deals">
            <h2 className="text-2xl font-bold mb-4 font-headline">My Claimed Deals</h2>
            <div className="space-y-4">
                {isTransactionsLoading ? (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      Loading your deals...
                    </CardContent>
                  </Card>
                ) : transactions && transactions.length > 0 ? (
                  transactions
                    .sort((a,b) => {
                        const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : a.timestamp.seconds * 1000;
                        const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : b.timestamp.seconds * 1000;
                        return timeB - timeA;
                    })
                    .map(transaction => (
                      <ClaimedDealCard key={transaction.transactionID} transaction={transaction} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      You haven't claimed any deals yet. Go rescue some food!
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
