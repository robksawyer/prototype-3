import Head from 'next/head'
import styles from '../styles/Home.module.css'

import MainScene from '../components/MainScene'

export default function Home() {
  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} flex flex-grow flex-col`}>
        <MainScene />
      </main>

      <footer
        className={`${styles.footer} w-full h-50 bg-black text-white px-40 flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
    </div>
  )
}
