import "@/styles/globals.scss";
import "@/styles/layout.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { HOC, Querier } from "@/components";
import { Toaster } from "sonner";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apollo-client";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster
              richColors
              position="bottom-left"
              toastOptions={{
                className: "max-w-[85vw] xs:max-w-none ",
              }}
            />
            <HOC>
              <Querier>
                <Component {...pageProps} />
              </Querier>
            </HOC>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default App;
