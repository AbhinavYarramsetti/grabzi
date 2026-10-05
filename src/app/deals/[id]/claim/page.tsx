
'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { doc, setDoc, updateDoc, getDoc, increment, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { deals } from '@/lib/mock-data';
import type { Deal, Transaction } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function ClaimPage() {
  const params = useParams();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isClaiming, setIsClaiming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claimedTransaction, setClaimedTransaction] = useState<Transaction | null>(null);

  const dealId = params.id as string;

  useEffect(() => {
    const foundDeal = deals.find(d => d.dealID === dealId);
    if(foundDeal) {
      setDeal(foundDeal);
    } else {
      setError("Deal not found.");
      setIsClaiming(false);
    }
  }, [dealId]);

  useEffect(() => {
    if (user && deal && firestore && isClaiming) {
      const claimDeal = async () => {
        try {
          const transactionID = `txn-${deal.dealID}-${user.uid}`;
          const transactionRef = doc(firestore, 'users', user.uid, 'transactions', transactionID);
          const transactionSnap = await getDoc(transactionRef);

          if (transactionSnap.exists()) {
            setClaimedTransaction(transactionSnap.data() as Transaction);
            setIsClaiming(false);
            return;
          }

          const rupeesSaved = deal.originalPrice - deal.price;

          const transaction: Omit<Transaction, 'timestamp'> = {
            transactionID,
            userID: user.uid,
            dealID: deal.dealID,
            dealTitle: deal.title,
            vendorName: "Vendor Name", // In a real app, you'd get this from the deal/vendor object
            dealImage: deal.image,
            paymentStatus: 'paid',
            uniqueCode: `GZCHN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            qrCode: PlaceHolderImages.find(img => img.id === 'qr-code'),
            rupeesSaved: rupeesSaved,
            status: 'active',
          };

          // 1. Save transaction
          setDoc(transactionRef, { ...transaction, timestamp: serverTimestamp() });

          // 2. Update user profile
          const userRef = doc(firestore, 'users', user.uid);
          updateDoc(userRef, {
            totalDealsClaimed: increment(1),
            rupeesSaved: increment(rupeesSaved),
          });

          // 3. Mark deal as claimed (optional, depending on business logic)
          // const dealRef = doc(firestore, 'deals', deal.dealID);
          // await updateDoc(dealRef, { status: 'claimed' });

          setClaimedTransaction({ ...transaction, timestamp: new Date() });
          toast({
            title: 'Deal Claimed!',
            description: 'The deal has been added to your profile.',
          });
        } catch (e) {
            console.error("Error claiming deal: ", e);
            setError("There was an error claiming your deal. Please try again.");
            toast({
                variant: 'destructive',
                title: 'Claim Failed',
                description: 'Could not claim the deal. Please try again later.'
            });
        } finally {
            setIsClaiming(false);
        }
      };

      claimDeal();
    } else if (!user && isClaiming) { // Redirect if not logged in
        setIsClaiming(false);
        router.push('/login');
    }
  }, [user, deal, firestore, isClaiming, router, toast, dealId]);

  if (isClaiming) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Claiming your deal...</p>
      </div>
    );
  }

  if (error) {
    return (
       <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.push('/')} className="mt-4">Back to Deals</Button>
      </div>
    );
  }
  
  if (!claimedTransaction) {
     return (
       <div className="flex min-h-screen items-center justify-center">
        <p>Something went wrong. Could not retrieve claim details.</p>
       </div>
    );
  }


  return (
    <>
    <Header />
    <div className="container mx-auto max-w-lg py-12 text-center">
      <Card>
        <CardHeader>
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="mt-4 text-3xl font-bold">Deal Claimed Successfully!</CardTitle>
          <CardDescription>
            Show this QR code at the store to redeem your deal.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="rounded-lg border p-4">
             {claimedTransaction.qrCode && (
              <Image
                src={claimedTransaction.qrCode.imageUrl}
                alt="QR Code"
                width={200}
                height={200}
                data-ai-hint={claimedTransaction.qrCode.imageHint}
              />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your unique code is</p>
            <p className="text-2xl font-bold tracking-widest">{claimedTransaction.uniqueCode}</p>
          </div>
           <div className="w-full text-left p-4 border rounded-lg bg-muted/50">
                <h3 className="font-bold">{claimedTransaction.dealTitle}</h3>
                <p className="text-sm text-muted-foreground">{deal?.vendor?.businessName}</p>
            </div>
          <div className="flex w-full gap-4">
            <Button asChild className="flex-1" variant="outline">
              <Link href="/">Find More Deals</Link>
            </Button>
            <Button asChild className="flex-1" variant="accent">
              <Link href="/profile">View My Deals</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
