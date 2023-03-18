import { useState } from "react";

export function GameOptions({ setGameData }) {
    const [mode, setMode] = useState("easy");
    const [type, setType] = useState("numbers");

    const modeOptions = [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
    ]

    const typeOptions = [
        { label: "Numbers", value: "numbers" },
        { label: "Letters", value: "letters" },
        { label: "Images", value: "images" },

    ];

    const handleStartClick = () => {
        setGameData({ mode, type });
    };

    const renderSelect = (label, options) => (
        <div className="flex flex-col">
            <label htmlFor="mode-select" className="text-lg mb-4">{label}</label>
            <select id="mode-select" value={mode} onChange={(e) => setMode(e.target.value)} className="w-48 h-10 rounded-lg px-4 text-black">
                {options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
            </select>
        </div>
    )

    const renderType = (label, options) => (
        <div>
            <label className="text-lg mb-4">{label}</label>
            <div className="flex gap-4">
            {options.map((option, i) => (
                <div key={i} className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="game-type"
                        value={option.value}
                        checked={type === option.value}
                        onChange={(e) => setType(e.target.value)}
                        className="mr-2"
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
            </div>

        </div>
    );

    return (
        //flex w-full flex-col flex-grow items-center justify-center h-screen
        <div className="flex flex-col gap-10 items-center justify-center h-screen text-center">
            {renderSelect('Select game mode:', modeOptions)}
            {renderType('Select game type:', typeOptions)}
            <button onClick={handleStartClick} className="mt-4 px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                Start Game
            </button>
        </div>
    );
}
