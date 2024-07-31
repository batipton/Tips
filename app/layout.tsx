import '@/app/ui/global.css';
import { inter } from '@/app/ui/general/fonts';
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="description" content="Welcome to Tips, where your content has real value! 
            Earn tokens daily and spend those tokens to access, promote, and reward 
            the best content in our community. 
            Engage, earn, and discover with Tips!" />
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
