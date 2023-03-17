import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Seo, Board, Header,} from '../components';


export default function Home() {
  return (
    <div className="h-full w-full">
    <Seo />
    <Header />
    <div className="mx-auto flex h-app-content w-full max-w-lg flex-col items-center">
      <Board />
    </div>
  </div>
  )
}
