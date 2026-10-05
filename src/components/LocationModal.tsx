
'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type LocationModalProps = {
  onClose: () => void;
};

export default function LocationModal({ onClose }: LocationModalProps) {
  const { updateUserLocation } = useApp();
  const [manualLocation, setManualLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGPS = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, you'd use a reverse geocoding service here.
        const locationName = `Current Location`; 
        updateUserLocation({ latitude, longitude, name: locationName });
        toast({ title: "Location updated!" });
        setIsLoading(false);
        onClose();
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast({ variant: 'destructive', title: "Could not get location", description: "Please enable location services in your browser." });
        setIsLoading(false);
      }
    );
  };
  
  const handleManualSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!manualLocation) return;
      setIsLoading(true);

      // This is a mock geocoding. A real app would use Google Maps Geocoding API.
      // For this demo, we'll use Chennai's coordinates if the input contains "chennai".
      if (manualLocation.toLowerCase().includes('chennai')) {
          const location = { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' };
          updateUserLocation(location);
          toast({ title: 'Location set to Chennai!' });
      } else {
          toast({ variant: 'destructive', title: 'Location not found', description: 'Please try a different location or use GPS.' });
      }
      
      setIsLoading(false);
      onClose();
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find Deals Near You</DialogTitle>
          <DialogDescription>
            Allow GPS access or enter your location to see the best food rescue deals nearby.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Button onClick={handleGPS} className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Use My Current Location
            </Button>
            <p className="text-center text-sm text-muted-foreground">OR</p>
            <form onSubmit={handleManualSubmit} className="space-y-2">
                <Input 
                    placeholder="Enter city or pincode (e.g., Chennai)"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    disabled={isLoading}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Search
                </Button>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
