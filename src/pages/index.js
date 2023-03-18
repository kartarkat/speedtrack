import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Seo, Board, Header, GameOptions} from '../components';
import { useState } from 'react';


export default function Home() {
  const [gameData, setGameData] = useState({mode: '', type: ''});

  return (
    <div className="h-full w-full">
      <Seo />
      <Header />
      <div className="mx-auto flex h-app-content w-full max-w-lg flex-col items-center">
        {gameData.mode ? (
          <Board gameData={gameData} gotoMenu={() => setGameData({})}/>
        ) : (
          <GameOptions setGameData={setGameData}/>
        )}
      </div>
    </div>
  );
}
