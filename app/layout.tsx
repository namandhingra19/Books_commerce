"use client";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ children, pageProps }) {
  return (
    <html lang="en">
      <body>
    <SessionProvider>
      <Layout>
        <NotificationsProvider position="top-center">
          {children}
        </NotificationsProvider>
      </Layout>
    </SessionProvider>
    </body>
    </html>
  );
}

export default MyApp;
