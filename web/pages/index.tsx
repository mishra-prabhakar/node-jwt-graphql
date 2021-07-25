import Head from 'next/head'
import Image from 'next/image'
import App from '../components/App'
import styles from '../styles/Home.module.css'
import client from '../components/apolloClient'
import { gql } from "apollo-boost";

export default function Home({ greet, loading }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <App greet={greet} loading = {loading}/>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const { loading, data } = await client.query({
    query: gql`
      query Welcome {
        welcome
      }
    `,
  });
  console.log('data -> ', data, ' loading -> ', loading);
  return {
    props: {
      greet: data.welcome,
    },
 };
}

