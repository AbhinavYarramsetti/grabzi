
import type { ImagePlaceholder } from "./placeholder-images";
import type { Vendor } from './mock-data'; // Use mock-data Vendor type

export type UserProfile = {
  userId: string;
  name: string;
  email: string;
  location?: { latitude: number; longitude: number; name?: string };
  totalDealsClaimed: number;
  totalFoodSaved: number; // in kg
  rupeesSaved: number;
  rank: string;
  avatar?: ImagePlaceholder;
};

export type Deal = {
  dealID: string;
  vendorID: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  timeLeft: Date;
  puzzleID: string;
  location: { latitude: number; longitude: number };
  status: 'active' | 'expired' | 'claimed';
  image: ImagePlaceholder;
  claimedCount?: number;
  vendor?: Vendor;
};

export type Puzzle = {
  puzzleID: string;
  question: string;
  correctAnswer: string;
  difficultyLevel: 'easy' | 'medium' | 'hard';
};

export type Transaction = {
    transactionID: string;
    userID: string;
    dealID: string;
    dealTitle: string;
    vendorName: string;
    dealImage?: ImagePlaceholder;
    paymentStatus: 'paid' | 'pending' | 'failed';
    timestamp: Date;
    uniqueCode: string;
    qrCode?: ImagePlaceholder;
    rupeesSaved: number;
    status?: 'active' | 'used';
};

export type LeaderboardEntry = {
  userID: string;
  userName: string;
  totalPoints: number;
  rank: number;
  avatar?: ImagePlaceholder;
};
