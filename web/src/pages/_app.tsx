import { ToastContainer } from "react-toastify";

import GlobalStyle from "@styles/globals";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import AppProvider from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Component {...pageProps} />
    </AppProvider>
  );
}
