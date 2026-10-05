import Header from '@/components/layout/Header';
import { leaderboard } from '@/lib/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Trophy className="h-6 w-6 text-yellow-700" />;
  return <span className="font-bold text-lg">{rank}</span>;
}


export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Trophy className="h-16 w-16 mx-auto text-accent" />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Food Rescuer Leaderboard
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See who's leading the charge in the fight against food waste. Keep claiming deals to climb the ranks!
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl py-12">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] text-center">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboard.map((entry) => (
                      <TableRow key={entry.userID}>
                        <TableCell className="text-center">
                          <div className="flex justify-center items-center">
                            <RankBadge rank={entry.rank} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={entry.avatar.imageUrl} alt={entry.userName} />
                              <AvatarFallback>{entry.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{entry.userName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">{entry.totalPoints.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
