import Head from 'next/head'
import dynamic from 'next/dynamic'

import styles from '../styles/Home.module.css'

import MainScene from '../components/MainScene'
import HamburgerMenu from '../components/HamburgerMenu'
import WaveText from '../components/WaveText'

const CursorCircle = dynamic(() => import('../components/CursorCircle'), {
  ssr: false,
})

export default function Home() {
  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main className={`${styles.main} flex flex-grow flex-col`}>
        <MainScene />
      </main>
      <div
        className="absolute"
        style={{
          left: '50%',
        }}
      >
        <div className="relative w-1/2" style={{ left: '-25%' }}>
          <WaveText className="text-center text-white pointer-events-none text-42" />
        </div>
      </div>

      <footer
        className={`${styles.footer} w-full h-50 bg-black text-white px-40 flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
      <CursorCircle />
    </div>
  )
}
