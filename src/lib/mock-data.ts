import type { User, Vendor, Deal, Puzzle, LeaderboardEntry, Transaction } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)!;

export const users: User[] = [
  {
    userID: 'user-1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    location: { latitude: 13.0827, longitude: 80.2707 }, // Chennai
    rupeesSaved: 1250,
    totalDealsClaimed: 12,
    totalFoodSaved: 5.5,
    rank: 'Food Savvy',
    avatar: findImage('user-1'),
  },
  {
    userID: 'user-2',
    name: 'Brenda Smith',
    email: 'brenda.smith@example.com',
    location: { latitude: 13.00, longitude: 80.25 }, // Near Chennai
    rupeesSaved: 2800,
    totalDealsClaimed: 25,
    totalFoodSaved: 11.2,
    rank: 'Rescue Ranger',
    avatar: findImage('user-2'),
  },
];

export const vendors: Vendor[] = [
  {
    vendorID: 'vendor-1',
    businessName: "Adyar Bakery - Adyar",
    address: '10, Sardar Patel Rd, Adyar, Chennai',
    contactInfo: '044-24422311',
    activeDealsCount: 2,
    totalSales: 1200,
    location: { latitude: 13.0064, longitude: 80.2560 },
  },
  {
    vendorID: 'vendor-2',
    businessName: 'Murugan Idli Shop - T. Nagar',
    address: '14, G N Chetty Rd, T. Nagar, Chennai',
    contactInfo: '044-42125152',
    activeDealsCount: 1,
    totalSales: 2500,
    location: { latitude: 13.0395, longitude: 80.2345 },
  },
  {
    vendorID: 'vendor-3',
    businessName: 'Hot Chips - Velachery',
    address: '23, 100 Feet Bypass Rd, Velachery, Chennai',
    contactInfo: '044-22433031',
    activeDealsCount: 1,
    totalSales: 800,
    location: { latitude: 12.9786, longitude: 80.2185 },
  },
  {
    vendorID: 'vendor-4',
    businessName: 'Fruitbay Fresh Mart - Anna Nagar',
    address: 'AC-15, 2nd Ave, Anna Nagar, Chennai',
    contactInfo: '044-42131424',
    activeDealsCount: 1,
    totalSales: 1500,
    location: { latitude: 13.0878, longitude: 80.2117 },
  },
  {
    vendorID: 'vendor-5',
    businessName: 'The Grand Sweets and Snacks - Besant Nagar',
    address: 'E-65, 3rd Main Rd, Besant Nagar, Chennai',
    contactInfo: '044-24467999',
    activeDealsCount: 1,
    totalSales: 3200,
    location: { latitude: 13.0039, longitude: 80.2652 },
  }
];

export const puzzles: Puzzle[] = [
    { puzzleID: 'puzzle-1', question: 'I am a fruit that is also a color. What am I?', correctAnswer: 'orange', difficultyLevel: 'easy' },
    { puzzleID: 'puzzle-2', question: 'What is the main ingredient in Idli?', correctAnswer: 'rice', difficultyLevel: 'easy' },
    { puzzleID: 'puzzle-3', question: 'Which city is known as the "Gateway of South India"?', correctAnswer: 'chennai', difficultyLevel: 'medium' },
    { puzzleID: 'puzzle-4', question: 'What is the key ingredient in Samosas?', correctAnswer: 'potato', difficultyLevel: 'easy' },
];

export const deals: Deal[] = [
  {
    dealID: 'deal-1',
    vendorID: 'vendor-1',
    title: '60% off Fresh Bread Bundles',
    description: 'Get a bundle of our freshly baked bread from today at a steep discount. Perfect for your breakfast needs!',
    price: 40,
    originalPrice: 100,
    discountPercent: 60,
    timeLeft: new Date(Date.now() + 1000 * 60 * 45), // 45 minutes left
    puzzleID: 'puzzle-1',
    location: { latitude: 13.0064, longitude: 80.2560 }, // Adyar
    status: 'active',
    image: findImage('deal-bakery'),
    claimedCount: 15,
  },
  {
    dealID: 'deal-2',
    vendorID: 'vendor-2',
    title: '30% off South Indian Breakfast Combo',
    description: 'A delicious combo of Idli, Vada, and Sambar. Limited quantity available!',
    price: 70,
    originalPrice: 100,
    discountPercent: 30,
    timeLeft: new Date(Date.now() + 1000 * 60 * 90), // 1.5 hours left
    puzzleID: 'puzzle-2',
    location: { latitude: 13.0395, longitude: 80.2345 }, // T. Nagar
    status: 'active',
    image: findImage('deal-idli'),
    claimedCount: 22,
  },
  {
    dealID: 'deal-3',
    vendorID: 'vendor-3',
    title: 'Buy 1 Get 1 on Samosas',
    description: 'Evening special! Buy one of our famous crispy samosas and get another one absolutely free.',
    price: 20,
    originalPrice: 40,
    discountPercent: 50,
    timeLeft: new Date(Date.now() + 1000 * 60 * 25), // 25 minutes left
    puzzleID: 'puzzle-4',
    location: { latitude: 12.9786, longitude: 80.2185 }, // Velachery
    status: 'active',
    image: findImage('deal-samosa'),
    claimedCount: 8,
  },
  {
    dealID: 'deal-4',
    vendorID: 'vendor-4',
    title: 'Fresh Juice Medley - 50% Off',
    description: 'A surprise mix of our fresh juices of the day. Healthy and refreshing!',
    price: 50,
    originalPrice: 100,
    discountPercent: 50,
    timeLeft: new Date(Date.now() - 1000 * 60 * 5), // Expired 5 minutes ago
    puzzleID: 'puzzle-3',
    location: { latitude: 13.0878, longitude: 80.2117 }, // Anna Nagar
    status: 'expired',
    image: findImage('deal-juice'),
    claimedCount: 18,
  },
  {
    dealID: 'deal-5',
    vendorID: 'vendor-5',
    title: 'Assorted Sweets Box - 40% Off',
    description: 'A box of traditional Indian sweets. Perfect for the family.',
    price: 150,
    originalPrice: 250,
    discountPercent: 40,
    timeLeft: new Date(Date.now() + 1000 * 60 * 120),
    puzzleID: 'puzzle-1',
    location: { latitude: 13.0039, longitude: 80.2652 }, // Besant Nagar
    status: 'active',
    image: findImage('deal-sweets'),
    claimedCount: 30,
  },
  {
    dealID: 'deal-6',
    vendorID: 'vendor-1',
    title: 'Morning Coffee & Muffin',
    description: 'Start your day with a hot filter coffee and a fresh muffin from Adyar Bakery.',
    price: 75,
    originalPrice: 150,
    discountPercent: 50,
    timeLeft: new Date(Date.now() + 1000 * 60 * 60 * 3),
    puzzleID: 'puzzle-2',
    location: { latitude: 13.0070, longitude: 80.2550 }, // Near Adyar
    status: 'claimed',
    image: findImage('deal-coffee'),
    claimedCount: 45,
  },
   {
    dealID: 'deal-7',
    vendorID: 'vendor-2',
    title: 'Dinner Special: Dosa & Chutney',
    description: 'Crispy dosa with a variety of chutneys. A perfect light dinner.',
    price: 80,
    originalPrice: 120,
    discountPercent: 33,
    timeLeft: new Date(Date.now() + 1000 * 60 * 60 * 2.5),
    puzzleID: 'puzzle-2',
    location: { latitude: 13.0385, longitude: 80.2355 }, // T. Nagar
    status: 'active',
    image: findImage('deal-pizza'),
    claimedCount: 12,
  },
  {
    dealID: 'deal-8',
    vendorID: 'vendor-4',
    title: 'Exotic Fruits Basket',
    description: 'A handpicked selection of fresh and exotic fruits at a great price.',
    price: 250,
    originalPrice: 400,
    discountPercent: 37,
    timeLeft: new Date(Date.now() + 1000 * 60 * 60 * 4),
    puzzleID: 'puzzle-3',
    location: { latitude: 13.0868, longitude: 80.2107 }, // Anna Nagar
    status: 'active',
    image: findImage('deal-salad'),
    claimedCount: 5,
  },
   {
    dealID: 'deal-9',
    vendorID: 'vendor-5',
    title: 'Weekend Special: Chaat Combo',
    description: 'A mouth-watering combination of your favorite chaat items.',
    price: 120,
    originalPrice: 200,
    discountPercent: 40,
    timeLeft: new Date(Date.now() + 1000 * 60 * 75),
    puzzleID: 'puzzle-4',
    location: { latitude: 13.0049, longitude: 80.2662 }, // Besant Nagar
    status: 'active',
    image: findImage('deal-burger'),
    claimedCount: 28,
  }
];

export const leaderboard: LeaderboardEntry[] = [
  { userID: 'user-2', userName: 'Brenda S.', totalPoints: 2800, rank: 1, avatar: findImage('user-2') },
  { userID: 'user-4', userName: 'Diana P.', totalPoints: 1950, rank: 2, avatar: findImage('user-4') },
  { userID: 'user-1', userName: 'Alex D.', totalPoints: 1250, rank: 3, avatar: findImage('user-1') },
  { userID: 'user-3', userName: 'Charlie B.', totalPoints: 800, rank: 4, avatar: findImage('user-3') },
];

export const transactions: Transaction[] = [
    {
        transactionID: 'txn-1',
        userID: 'user-1',
        dealID: 'deal-6',
        dealTitle: 'Morning Coffee & Muffin',
        vendorName: 'Adyar Bakery - Adyar',
        dealImage: findImage('deal-coffee'),
        paymentStatus: 'paid',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        uniqueCode: 'GZCHN-ABC123',
        qrCode: findImage('qr-code'),
        rupeesSaved: 75,
        status: 'used'
    }
];
