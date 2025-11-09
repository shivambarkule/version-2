// Server component wrapper for generateStaticParams
import ProjectDetailPage from './page-client';

export async function generateStaticParams() {
  // Return empty array - routes will be handled client-side via Firebase rewrites
  return [];
}

export default function Page() {
  return <ProjectDetailPage />;
}
