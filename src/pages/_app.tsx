import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
// import '../styles/custom-big-calendar.css';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

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
