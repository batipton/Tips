import "@/app/ui/global.css";
import { inter } from "@/app/ui/general/fonts";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10b981',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tipseco.com'),
  title: {
    template: '%s | Tips - Where Content Has Real Value',
    default: 'Tips - Where Your Content Has Real Value | Earn Tokens Daily',
  },
  description: 'Welcome to Tips, where your content has real value! Earn tokens daily and spend those tokens to access, promote, and reward the best content in our community. Engage, earn, and discover with Tips!',
  keywords: [
    'content creator',
    'social media',
    'earn tokens',
    'community platform',
    'content monetization',
    'social networking',
    'digital rewards',
    'content platform'
  ],
  authors: [{ name: 'Tips Team' }],
  creator: 'Tips',
  publisher: 'Tips',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tipseco.com',
    title: 'Tips - Where Your Content Has Real Value',
    description: 'Earn tokens daily and spend those tokens to access, promote, and reward the best content in our community.',
    siteName: 'Tips',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Tips - Where Your Content Has Real Value',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tips - Where Your Content Has Real Value',
    description: 'Earn tokens daily and spend those tokens to access, promote, and reward the best content in our community.',
    images: ['/opengraph-image.png'],
    creator: '@tipseco',
  },
  verification: {
    // Add your verification codes here when you get them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://tipseco.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
