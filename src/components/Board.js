import { generateBoxesHelper } from '@/utils/helper';
import { useEffect, useRef, useState } from 'react';
import Box from './Box';

export const Board = ({ gameData, gotoMenu }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [boxes, setBoxes] = useState([]);
    const [currentCards, setCurrentCards] = useState([]);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameOver, setGameOver] = useState({ running: true, win: false });

    const generateBoxes = async () => {
        const { mode } = gameData
        if (mode === 'easy') setTimeLeft(120)
        if (mode === 'medium') setTimeLeft(150)
        if (mode === 'hard') setTimeLeft(180)
        setBoxes(await generateBoxesHelper(gameData));
        setIsLoading(false);
    }

    useEffect(() => {
        generateBoxes()
    }, []);

    useEffect(() => {
        if (boxes.length > 1) {
            const isAllFound = boxes.every((box) => box.isFound);
            console.log(isAllFound)
            if (isAllFound) setGameOver({ running: false, win: true });
        }
    }, [boxes])

    useEffect(() => {
        setTimeout(() => {
            if (currentCards.length === 2) {
                const [firstCard, secondCard] = currentCards;
                if (firstCard.value === secondCard.value) {
                    setBoxes((prevBoxes) => prevBoxes.map((box) => box.value === firstCard.value ? { ...box, isFound: true } : box)
                    );
                } else {
                    setBoxes((prevBoxes) => prevBoxes.map((box) => !box.isFound && (box.id === firstCard.id || box.id === secondCard.id)
                        ? { ...box, isFlipped: false } : box));
                }
                setCurrentCards([]);
            }
        }, 750)
    }, [currentCards]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(timer);
            setGameOver(prev => prev ? { ...prev, running: false } : prev);
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    const handleRestart = async () => {
        setGameOver({ running: true, win: false });
        generateBoxes()
    };

    const handleBoxClick = (id) => {
        setBoxes((prevBoxes) => prevBoxes.map((box) => box.id === id && !box.isFound ? { ...box, isFlipped: true } : box));
        setCurrentCards((prevCards) => [...prevCards, boxes.find((box) => box.id === id)])
    };

    if (isLoading) {
        return (
            <div className="flex w-full flex-col flex-grow items-center justify-center h-screen">
                <div className="relative inline-block">
                    <div className="w-8 h-8 border-2 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
                <div className="ml-3 text-blue-500 font-bold text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col flex-grow items-center justify-center h-screen">
            <div className="grid w-80 max-w-xs grid-cols-4 gap-[5px] p-2">
                {boxes.map((box) => (
                    <Box
                        gameType={gameData.type}
                        key={box.id}
                        data={box}
                        onClick={currentCards.length === 2 || !gameOver.running ? () => { } : () => handleBoxClick(box.id)}
                    />
                ))}
            </div>
            <div className="flex h-[125px] flex-col items-center justify-center mt-4">
                {gameOver.running ? (
                    <div className="text-xl">Time Left: {timeLeft}s</div>
                ) :
                    <div className="flex flex-col items-center justify-center">
                        {gameOver.win ? <div className="text-2xl font-bold text-blue-600">You won</div>
                            : <div className="text-2xl font-bold text-red-600">Game Over</div>}
                    </div>
                }
                <div className='flex gap-5'>
                    <button onClick={handleRestart} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                        Restart
                    </button>
                    <button onClick={gotoMenu} className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md">
                        Main Menu
                    </button>
                </div>
            </div>
        </div>
    );

}
