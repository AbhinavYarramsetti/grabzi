
'use client';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { getRecommendations } from '@/app/actions';
import { deals as allDeals } from '@/lib/mock-data';
import type { Deal, UserProfile } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import DealCard from './DealCard';

export default function PersonalizedDeals() {
  const { user } = useApp();
  const [recommendedDeals, setRecommendedDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchRecommendations = async () => {
        setLoading(true);
        // Casting UserProfile to a format getRecommendations expects
        const apiUser = {
          userID: user.userId,
          totalDealsClaimed: user.totalDealsClaimed,
        };
        const result = await getRecommendations(apiUser as any);
        if (result.recommendations) {
          const keywords = result.recommendations
            .join(' ')
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 3);
          
          const uniqueKeywords = [...new Set(keywords)];
          
          const matchedDeals = allDeals.filter(deal => 
            deal.status === 'active' && 
            uniqueKeywords.some(keyword => 
              deal.title.toLowerCase().includes(keyword) || 
              deal.description.toLowerCase().includes(keyword)
            )
          );
          setRecommendedDeals(matchedDeals.slice(0, 5));
        }
        setLoading(false);
      };
      fetchRecommendations();
    } else {
      setRecommendedDeals([]);
      setLoading(false);
    }
  }, [user]);

  if (!user || (!loading && recommendedDeals.length === 0)) {
    return null;
  }
  
  if (loading) {
    return (
        <section className="w-full py-12 md:py-24">
            <div className="container">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Just for You, {user?.name.split(' ')[0]}</h2>
                <p>Loading personalized recommendations...</p>
            </div>
        </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 bg-primary/5">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 font-headline">Just for You, {user.name.split(' ')[0]}</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendedDeals.map((deal) => (
              <CarouselItem key={deal.dealID} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <DealCard deal={deal} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
