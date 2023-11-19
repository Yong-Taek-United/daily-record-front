import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans } from 'next/font/google';

const NotoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={NotoSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
