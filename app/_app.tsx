import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <NotificationsProvider position="top-center">
          <Component {...pageProps}></Component>
        </NotificationsProvider>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
