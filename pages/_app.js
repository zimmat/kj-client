import '../styles/default.css'
import '../styles/adminlte.min.css'
import '../styles/all.css'

import Head from 'next/head';
import { SessionProvider } from "next-auth/react"

export default ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1, minimum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />

        <title>{'Dashboard'}</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
};