import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Head from 'next/head';
import {Provider} from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp;
