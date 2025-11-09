import ExcursionDetailPage from './page-client';

export async function generateStaticParams() {
  // Return a placeholder to satisfy static export requirement
  // Actual routing will be handled client-side
  return [{ slug: ['placeholder'] }];
}

export default function Page() {
  return <ExcursionDetailPage />;
}
