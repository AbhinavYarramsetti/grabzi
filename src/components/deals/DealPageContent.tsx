
'use client';

import { notFound } from 'next/navigation';
import { type Deal, type Vendor, type Puzzle } from '@/lib/types';
import { deals, vendors, puzzles } from '@/lib/mock-data';
import DealClient from './DealClient';
import { useEffect, useState } from 'react';

export default function DealPageContent({ dealId }: { dealId: string }) {
  const [deal, setDeal] = useState<Deal | undefined>();
  const [vendor, setVendor] = useState<Vendor | undefined>();
  const [puzzle, setPuzzle] = useState<Puzzle | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundDeal = deals.find(d => d.dealID === dealId);
    if (foundDeal) {
      setDeal(foundDeal);
      setVendor(vendors.find(v => v.vendorID === foundDeal.vendorID));
      setPuzzle(puzzles.find(p => p.puzzleID === foundDeal.puzzleID));
    }
    setIsLoading(false);
  }, [dealId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <p>Loading deal...</p>
      </div>
    );
  }

  if (!deal) {
    notFound();
  }
  
  return <DealClient deal={deal} vendor={vendor} puzzle={puzzle} />;
}
