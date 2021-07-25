import Head from 'next/head'
import App from '../components/App'
import styles from '../styles/Home.module.css'
import client from '../components/apolloClient'
import { ApolloProvider } from '@apollo/react-hooks'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ApolloProvider client = {client}>
          <App />
        </ApolloProvider>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

