
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TimerIcon, Puzzle as PuzzleIcon } from 'lucide-react';
import type { Deal, Vendor, Puzzle } from '@/lib/types';
import { useApp } from '../AppProvider';
import { useRouter } from 'next/navigation';
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
import { Input } from '../ui/input';

type DealClientProps = {
    deal: Deal;
    vendor?: Vendor | null;
    puzzle?: Puzzle | null;
}

export default function DealClient({ deal, vendor, puzzle }: DealClientProps) {
  const [isClient, setIsClient] = useState(false);
  const { user } = useApp();
  const router = useRouter();
  const { toast } = useToast();

  const [showPuzzle, setShowPuzzle] = useState(false);
  const [answer, setAnswer] = useState('');

  const calculateTimeLeft = () => {
    const difference = +new Date(deal.timeLeft) - +new Date();
    let timeLeft: { hours?: number; minutes?: number; seconds?: number } = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{ hours?: number; minutes?: number; seconds?: number }>({});

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal.timeLeft]);

  const timerComponents = Object.keys(timeLeft).length > 0
    ? `${String(timeLeft.hours ?? 0).padStart(2, '0')}:${String(timeLeft.minutes ?? 0).padStart(2, '0')}:${String(timeLeft.seconds ?? 0).padStart(2, '0')}`
    : 'Expired';

  const handlePlay = () => {
    if (!user) {
        router.push('/login');
    } else {
        setShowPuzzle(true);
    }
  };

  const handlePuzzleSubmit = () => {
    if (puzzle && answer.toLowerCase() === puzzle?.correctAnswer.toLowerCase()) {
        toast({
            title: 'Correct!',
            description: 'You have unlocked the deal!',
        });
        router.push(`/deals/${deal.dealID}/claim`);
    } else {
         toast({
            variant: 'destructive',
            title: 'Incorrect Answer',
            description: 'Please try again.',
        });
    }
    setAnswer('');
  }

  const isDealExpired = Object.keys(timeLeft).length === 0;

  return (
    <>
    <AlertDialog open={showPuzzle} onOpenChange={setShowPuzzle}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Solve the Puzzle!</AlertDialogTitle>
                <AlertDialogDescription>
                    {puzzle?.question}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <Input 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer"
            />
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlePuzzleSubmit}>Submit</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <div className="container mx-auto max-w-4xl py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={deal.image.imageUrl}
            alt={deal.title}
            width={600}
            height={400}
            className="w-full rounded-lg object-cover aspect-video shadow-lg"
            data-ai-hint={deal.image.imageHint}
          />
          <div className="mt-4">
              <h1 className="text-3xl font-bold font-headline">{deal.title}</h1>
              <p className="text-lg text-muted-foreground">{vendor?.businessName}</p>
          </div>
          <div className="flex items-baseline gap-4 mt-4">
              <p className="text-4xl font-bold text-primary">₹{deal.price.toFixed(2)}</p>
              <p className="text-xl text-muted-foreground line-through">₹{deal.originalPrice.toFixed(2)}</p>
              <Badge variant="destructive" className="text-base">{deal.discountPercent}% OFF</Badge>
          </div>
          <p className="mt-4 text-foreground">{deal.description}</p>
          <div className="mt-6 flex items-center gap-2 text-lg font-semibold text-destructive">
              <TimerIcon className="h-6 w-6" />
              {isClient ? <span>Time left: {timerComponents}</span> : <span>Loading timer...</span>}
          </div>
        </div>

        <div>
          <Card className="bg-primary/10">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <PuzzleIcon className="text-accent" />
                      <span>Unlock this Deal!</span>
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                 <p>Play a quick game to prove you're a real food rescuer and unlock this amazing deal.</p>
                 <Button size="lg" className="w-full" onClick={handlePlay} disabled={isDealExpired} variant="default">
                    {isDealExpired ? 'Deal Expired' : 'Play to Unlock'}
                 </Button>
              </CardContent>
          </Card>
          
          <Button variant="outline" size="lg" className="w-full mt-4" asChild>
              <Link href="/">Back to Deals</Link>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
