
'use client';

import type { Deal, Vendor } from '@/lib/types';
import { vendors } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { TimerIcon } from 'lucide-react';

type DealCardProps = {
  deal: Deal;
};

export default function DealCard({ deal }: DealCardProps) {
  const vendor = vendors.find(v => v.vendorID === deal.vendorID) as Vendor;

  const calculateTimeLeft = () => {
    const difference = +new Date(deal.timeLeft) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      const totalDuration = +new Date(deal.timeLeft) - (+new Date(deal.timeLeft) - 2 * 60 * 60 * 1000); // assume 2h deals
      const remaining = +new Date(deal.timeLeft) - +new Date();
      setProgress(Math.max(0, (remaining / totalDuration) * 100));
    }, 1000);

    return () => clearTimeout(timer);
  });
  
  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
     if (!value && interval === 'hours') return null;
     return (
        <span key={interval}>
            {String(value).padStart(2, '0')}{interval === 'hours' ? 'h' : 'm'}
        </span>
     );
  });


  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <Link href={`/deals/${deal.dealID}`} prefetch={false}>
        <CardHeader className="p-0">
          <div className="relative">
            <Image
              src={deal.image.imageUrl}
              alt={deal.title}
              width={600}
              height={400}
              className="aspect-video w-full object-cover"
              data-ai-hint={deal.image.imageHint}
            />
            <Badge variant="destructive" className="absolute top-2 right-2">
              {deal.discountPercent}% OFF
            </Badge>
          </div>
          <div className="p-4">
            <CardTitle className="text-lg leading-snug">{deal.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{vendor.businessName}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">₹{deal.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground line-through">₹{deal.originalPrice.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
          <Progress value={progress} className="h-2 w-full" />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TimerIcon className="h-4 w-4" />
            {timerComponents.length ? <>{timerComponents[0]} {timerComponents[1]} left</> : 'Expired'}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
