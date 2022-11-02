import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps}></Component>
      </Layout> 
  </SessionProvider>
  )
}

export default MyApp
