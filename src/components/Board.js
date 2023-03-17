import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const Board = () => {

    const [boxes, setBoxes] = useState([]);
    const [track, setTrack] = useState({})
    const [score, setScore] = useState(0)

    const generateBoxes = () => {
        const randomNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 100));
        const numbers = [...randomNumbers, ...randomNumbers];
        // const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
        const boxes = numbers.map((number) => ({
            number,
            isHidden: true,
            complete: false,
            id: uuidv4()
        }));
        setBoxes(boxes);
    };

    useEffect(() => {
        generateBoxes();
    }, []);

    const handleBoxClick = (id) => {
        const currentBox = boxes.filter(d => d.id === id)[0]
        console.log(track === currentBox, track, currentBox)
        if (track.number === currentBox.number) {
            setScore(prev => prev + 1)
            setBoxes(boxes => {
                return boxes.map(box => {
                    if (box.id === track.id || box.id === currentBox.id)  return { ...box, isHidden: false, complete: true }
                    else return box
                })
            })
        } else {
            setTrack(currentBox)
        }
        const NewBoxs = boxes.map(box => {
            if (box.id === id) return { ...box, isHidden: !box.isHidden }
            else return box
        })
        setBoxes(boxes => {
            return boxes.map(box => {
                if (box.id === id) return { ...box, isHidden: !box.isHidden }
                else return box
            })
        })
    }

    const renderBox = (box) => {
        const { isHidden, number, id, complete } = box
        return (
            <div
                className="flex select-none items-center justify-center border-2 text-3xl font-bold uppercase border-gray-50 dark:border-gray-100 text-black dark:text-white"
                key={id}
                onClick={() => complete ? {} : handleBoxClick(id, number)}
            >
                {isHidden ? "" : number}
            </div>
        );
    }

    return (
        <div className="flex w-full flex-grow items-center justify-center h-screen">
            <div className="grid h-[372px] w-80 max-w-xs grid-cols-4 grid-rows-6 gap-[5px] p-2">
                {boxes.map(box => renderBox(box))}
            </div>
            <div>score : {score}</div>
        </div>
    );
}
