
'use client';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { deals as allDeals } from '@/lib/mock-data';
import DealCard from '@/components/deals/DealCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalizedDeals from '@/components/deals/PersonalizedDeals';
import LocationModal from '@/components/LocationModal';
import { useApp } from '@/components/AppProvider';
import { useMemo } from 'react';
import { haversineDistance } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { location, showLocationModal, setShowLocationModal } = useApp();

  const nearbyDeals = useMemo(() => {
    if (!location) return [];
    return allDeals
      .filter(deal => deal.status === 'active')
      .map(deal => ({
        ...deal,
        distance: haversineDistance(location, deal.location),
      }))
      .filter(deal => deal.distance <= 15) // 15 km radius
      .sort((a, b) => a.distance - b.distance);
  }, [location]);

  const popularDeals = [...allDeals.filter(d => d.status === 'active')].sort((a, b) => (b.claimedCount || 0) - (a.claimedCount || 0));
  const expiringSoonDeals = [...allDeals.filter(d => d.status === 'active')].sort((a, b) => a.timeLeft.getTime() - b.timeLeft.getTime());

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {showLocationModal && <LocationModal onClose={() => setShowLocationModal(false)} />}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-foreground">
                    Save Food, Save Money, Be a Hero
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    GrabZi turns surplus food into a thrilling treasure hunt. Solve puzzles, claim deals, and join a community of food rescuers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link
                      href="#deals"
                      className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium text-accent-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Explore Deals
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PersonalizedDeals />

        <section id="deals" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Find Your Next Meal</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Amazing deals from your favorite local spots are just a puzzle away.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="nearby" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
                </TabsList>
                <TabsContent value="nearby">
                  {!location ? (
                     <Alert className="mt-6 text-center">
                        <MapPin className="h-4 w-4" />
                        <AlertTitle>Location Needed</AlertTitle>
                        <AlertDescription>
                        Please share or enter your location to find deals near you.
                        </AlertDescription>
                    </Alert>
                  ) : nearbyDeals.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
                      {nearbyDeals.map(deal => (
                        <DealCard key={deal.dealID} deal={deal} />
                      ))}
                    </div>
                  ) : (
                    <Alert className="mt-6 text-center">
                        <MapPin className="h-4 w-4" />
                        <AlertTitle>No Deals Nearby</AlertTitle>
                        <AlertDescription>
                            We couldn't find any active deals within 15km of your location.
                        </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>
                <TabsContent value="popular">
                  <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
                    {popularDeals.map(deal => (
                      <DealCard key={deal.dealID} deal={deal} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="expiring">
                  <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
                    {expiringSoonDeals.map(deal => (
                      <DealCard key={deal.dealID} deal={deal} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 GrabZi Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
