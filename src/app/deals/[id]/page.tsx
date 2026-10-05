
import Header from '@/components/layout/Header';
import DealPageContent from '@/components/deals/DealPageContent';

export default function DealPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <DealPageContent dealId={params.id} />
    </>
  );
}
