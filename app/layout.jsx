import './globals.css';
import Script from 'next/script';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: 'Cresthour | Weekly Live Webinars: Soft Skills & Basic Coding',
  description: 'Join our weekly live cohorts to master fundamental coding logic and confident interview articulation. Register for individual sessions or get the All-Access Monthly Pass (₹800).',
  keywords: 'webinar, soft skills, coding, basic coding, dsa, tech interviews, cresthour, weekly live workshop',
  openGraph: {
    title: 'Cresthour Weekly Live Webinars',
    description: '1 Soft Skill + 1 Basic Coding Concept Every Week.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-white text-black font-sans antialiased selection:bg-deepGreen selection:text-white">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
