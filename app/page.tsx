import HomeLanding from '@/components/HomeLanding';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeLanding />
    </Suspense>
  );
}
