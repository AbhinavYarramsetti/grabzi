'use server';

/**
 * @fileOverview Personalized deal recommendations flow.
 *
 * This flow analyzes user preferences and past activity to provide personalized deal recommendations.
 * It exports:
 * - `getPersonalizedDealRecommendations`: A function to trigger the personalized deal recommendation flow.
 * - `PersonalizedDealRecommendationsInput`: The input type for the `getPersonalizedDealRecommendations` function.
 * - `PersonalizedDealRecommendationsOutput`: The output type for the `getPersonalizedDealRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDealRecommendationsInputSchema = z.object({
  userID: z.string().describe('The ID of the user for whom to generate recommendations.'),
  userPreferences: z
    .string()
    .describe(
      'The preferences of the user, as a comma separated list of food categories, cuisines, and dietary restrictions.'
    ),
  pastActivity: z
    .string()
    .describe(
      'The past activity of the user, including deals claimed, vendors visited, and puzzles solved, as a comma separated list.'
    ),
});
export type PersonalizedDealRecommendationsInput = z.infer<typeof PersonalizedDealRecommendationsInputSchema>;

const PersonalizedDealRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized deal recommendations based on the user input.'),
});
export type PersonalizedDealRecommendationsOutput = z.infer<typeof PersonalizedDealRecommendationsOutputSchema>;

export async function getPersonalizedDealRecommendations(
  input: PersonalizedDealRecommendationsInput
): Promise<PersonalizedDealRecommendationsOutput> {
  return personalizedDealRecommendationsFlow(input);
}

const personalizedDealRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedDealRecommendationsPrompt',
  input: {schema: PersonalizedDealRecommendationsInputSchema},
  output: {schema: PersonalizedDealRecommendationsOutputSchema},
  prompt: `You are an expert personal shopping assistant specializing in recommending food deals to users.

  Based on the user's preferences and past activity, provide a list of personalized deal recommendations.
  Be sure to take into account the user's preferences, such as their favorite food categories, cuisines, and dietary restrictions.
  Also consider the user's past activity, such as deals claimed, vendors visited, and puzzles solved.

  Preferences: {{{userPreferences}}}
  Past Activity: {{{pastActivity}}}

  Recommendations:`,
});

const personalizedDealRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedDealRecommendationsFlow',
    inputSchema: PersonalizedDealRecommendationsInputSchema,
    outputSchema: PersonalizedDealRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedDealRecommendationsPrompt(input);
    return output!;
  }
);
