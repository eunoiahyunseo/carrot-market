import "../styles/globals.css";
import type { AppProps } from "next/app";
import useSWR, { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 1000,
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
