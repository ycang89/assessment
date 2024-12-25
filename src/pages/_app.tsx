import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
