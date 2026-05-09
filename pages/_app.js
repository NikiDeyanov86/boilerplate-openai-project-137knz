// file: /pages/_app.js

import "@/styles/globals.css";
import Disclaimer from "@/components/Disclaimer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Disclaimer />
    </>
  );
}