
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">
              Privacy Policy
            </h1>
            <div className="prose dark:prose-invert max-w-none h-96 overflow-y-auto border rounded-lg p-6">
                <p>Last updated: 26 October, 2025</p>

                <h2><strong>1. Information Collection and Use</strong></h2>
                <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
                <h3>Types of Data Collected</h3>
                <ul>
                    <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information, including but not limited to: email address, name, and location data.</li>
                    <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used.</li>
                </ul>

                <h2><strong>2. Use of Data</strong></h2>
                <p>
                GrabZi uses the collected data for various purposes:
                - To provide and maintain the Service
                - To notify you about changes to our Service
                - To provide customer care and support
                - To provide analysis or valuable information so that we can improve the Service
                </p>

                <h2><strong>3. Location Information</strong></h2>
                <p>
                We use your location information to provide features of our Service, such as displaying nearby deals. You can enable or disable location services when you use our Service at any time, through your mobile device settings.
                </p>

                <h2><strong>4. Data Security</strong></h2>
                <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
                
                <h2><strong>5. Service Providers</strong></h2>
                <p>
                We may employ third-party companies and individuals to facilitate our Service (&quot;Service Providers&quot;), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. This includes Firebase and Google Maps API.
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
