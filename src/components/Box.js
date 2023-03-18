import Image from 'next/image';
import React from 'react'

export default function Box({ data, onClick, gameType }) {
    const { id, value, isFound, isFlipped } = data
    const aspectRatio = "1 / 1";
    return (
        <div
        className={`flex select-none items-center justify-center border-2 cursor-pointer text-3xl font-bold uppercase border-gray-50 dark:border-gray-100 text-black
        ${isFlipped ? 'bg-white flip-right' : 'bg-blue-500 flip-left'} 
        ${isFound ?  'opacity-100 dark:border-red-500' : ''}`}
            key={id}
            onClick={() => isFlipped ? undefined : onClick(id)}
            style={{ aspectRatio }}
        >
            {gameType === 'images' ?
                <div className={isFlipped || isFound ? '' : 'hidden'} style={{opacity: isFound ? 0.5 : 1 }}>
                    <Image
                        priority
                        width={100}
                        height={100}
                        src={value}
                        alt='value'
                    />
                </div> :
                <div className={isFlipped || isFound ? '' : 'hidden'}>{value}</div>
            }
            {!isFlipped && <div>{!isFound || !isFlipped ? '?' : ''}</div>}
        </div>
    );
}
