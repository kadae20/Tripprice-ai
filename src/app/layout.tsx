import type { Metadata } from 'next';
import { Noto_Sans_KR, Playfair_Display } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Tripprice AI — 내 여행 스타일에 맞는 호텔 추천',
  description:
    '신혼여행, 가족여행, 출장... 여행 목적과 예산을 입력하면 AI가 최적의 호텔을 추천해드려요.',
  openGraph: {
    title: 'Tripprice AI — 내 여행 스타일에 맞는 호텔 추천',
    description: '여행 목적과 예산을 입력하면 AI가 최적의 호텔을 추천해드려요.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tripprice AI — 내 여행 스타일에 맞는 호텔 추천',
    description: '여행 목적과 예산을 입력하면 AI가 최적의 호텔을 추천해드려요.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-noto-sans-kr), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
