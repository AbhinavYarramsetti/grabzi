
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">
              Terms of Service
            </h1>
            <div className="prose dark:prose-invert max-w-none h-96 overflow-y-auto border rounded-lg p-6">
                <p>Last updated: 26 October, 2025</p>

                <h2><strong>1. Acceptance of Terms</strong></h2>
                <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>

                <h2><strong>2. Description of Service</strong></h2>
                <p>
                GrabZi is a platform that connects users with local food vendors offering surplus food at discounted prices. The Service includes interactive games to unlock deals, a leaderboard to track progress, and personalized recommendations.
                </p>

                <h2><strong>3. User Accounts</strong></h2>
                <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>

                <h2><strong>4. Deals and Redemption</strong></h2>
                <p>
                Deals are offered by third-party vendors. GrabZi is not responsible for the quality, safety, or legality of the items provided by vendors. Once a deal is claimed, you will receive a unique code or QR code for redemption. It is your responsibility to redeem the deal within the specified time.
                </p>
                
                <h2><strong>5. User Conduct</strong></h2>
                <p>
                You agree not to use the Service to:
                - Violate any local, state, national, or international law.
                - Impersonate any person or entity.
                - Engage in any other conduct that restricts or inhibits any other person from using or enjoying the Service.
                </p>

                <h2><strong>6. Termination</strong></h2>
                <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                
                <h2><strong>7. Changes to Terms</strong></h2>
                <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
                </p>
            </div>
            <Button asChild className="mt-8">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
      </main>
    </div>
  );
}
