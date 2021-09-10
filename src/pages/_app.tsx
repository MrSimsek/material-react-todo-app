import { useEffect, Fragment } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { mainTheme } from "../themes";
import { CategoryContextProvider } from "../context/CategoryContext";
import { TodoContextProvider } from "../context/TodoContext";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={mainTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <TodoContextProvider>
          <CategoryContextProvider>
            <Component {...pageProps} />
          </CategoryContextProvider>
        </TodoContextProvider>
      </ThemeProvider>
    </Fragment>
  );
}
export default MyApp;
