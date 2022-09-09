import "../styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "reactjs-popup/dist/index.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <main className="mx-auto my-11 max-w-instaWidth w-full lg:px-0 px-4">
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

export default MyApp;
