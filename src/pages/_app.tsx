import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans, Inter } from 'next/font/google';

const NotoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '800'],
});

const InterFont = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '600', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={InterFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
