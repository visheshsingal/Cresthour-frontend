'use client';

export const dynamic = 'force-dynamic';

import Hero from '../src/components/Hero';
import CoursePromo from '../src/components/CoursePromo';
import OurPolicies from '../src/components/OurPolicies';
import Newsletter from '../src/components/Newsletter';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CoursePromo />
      <OurPolicies />
      <Newsletter />
    </main>
  );
}
