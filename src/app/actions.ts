'use server';

import { getPersonalizedDealRecommendations } from '@/ai/flows/personalized-deal-recommendations';
import type { User } from '@/lib/types';

export async function getRecommendations(user: User) {
  // In a real app, past activity and preferences would be more detailed and stored in the user's profile.
  const pastActivity = `claimed ${user.totalDealsClaimed} deals, visited vendors, solved puzzles`;
  const userPreferences = 'pizza, burgers, vegetarian, sushi, healthy salads, coffee';

  try {
    const result = await getPersonalizedDealRecommendations({
      userID: user.userID,
      userPreferences,
      pastActivity,
    });
    
    // The AI returns a single string. We need to parse it into a list.
    const recommendations = result.recommendations
      .split('\n')
      .map(rec => rec.trim().replace(/^- /, ''))
      .filter(Boolean);
    
    return { recommendations };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return { error: 'Failed to get recommendations.' };
  }
}
