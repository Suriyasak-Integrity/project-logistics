import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Integrity Logistics Thailand - Beyond the Average Freight Forwarder',
  description: 'Professional freight forwarding and logistics solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JEV5H7KRQC"
        />

        <Script
          id="google-analytics-inline"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JEV5H7KRQC');
          `}
        </Script>

        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
