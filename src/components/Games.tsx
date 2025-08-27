import React, { useState, useEffect } from 'react';
import { Palette, Trees, Grid2X2, Waves, Gamepad2, Target } from 'lucide-react';

// Memory Game
const MEMORY_CARDS = [
  '🌸', '🌺', '🌹', '🌷', '🌼', '🌻', '🍀', '🌿',
  '🌸', '🌺', '🌹', '🌷', '🌼', '🌻', '🍀', '🌿'
];

// Zen Garden Elements
const ZEN_ELEMENTS = [
  '🪨', '🌳', '🌿', '🌸', '🎋', '🍁', '⛩️', '💮', '🌊', '🍃'
];

// Bubble Colors with opacity
const BUBBLE_COLORS = [
  'rgba(255, 107, 107, 0.6)',
  'rgba(78, 205, 196, 0.6)',
  'rgba(69, 183, 209, 0.6)',
  'rgba(150, 206, 180, 0.6)',
  'rgba(255, 238, 173, 0.6)'
];

interface GameCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

function GameCard({ title, icon, description, onClick }: GameCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2 duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 transform hover:rotate-12 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// function MemoryGame() {
//   const [cards, setCards] = useState(MEMORY_CARDS.sort(() => Math.random() - 0.5));
//   const [flipped, setFlipped] = useState<number[]>([]);
//   const [matched, setMatched] = useState<number[]>([]);
//   const [moves, setMoves] = useState(0);

//   useEffect(() => {
//     if (flipped.length === 2) {
//       setMoves(m => m + 1);
//       if (cards[flipped[0]] === cards[flipped[1]]) {
//         setMatched([...matched, ...flipped]);
//         setFlipped([]);
//       } else {
//         setTimeout(() => setFlipped([]), 1000);
//       }
//     }
//   }, [flipped, cards, matched]);

//   const resetGame = () => {
//     setCards(MEMORY_CARDS.sort(() => Math.random() - 0.5));
//     setFlipped([]);
//     setMatched([]);
//     setMoves(0);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="text-lg font-semibold">Moves: {moves}</div>
//         <button 
//           onClick={resetGame}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Reset Game
//         </button>
//       </div>
//       <div className="grid grid-cols-4 gap-4">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             onClick={() => !flipped.includes(index) && flipped.length < 2 && setFlipped([...flipped, index])}
//             className={`h-24 w-24 flex items-center justify-center text-4xl cursor-pointer rounded-lg transition-all duration-500 transform hover:scale-105 ${
//               flipped.includes(index) || matched.includes(index)
//                 ? 'bg-blue-500 text-white rotate-y-180'
//                 : 'bg-gray-200 hover:bg-gray-300'
//             }`}
//           >
//             {(flipped.includes(index) || matched.includes(index)) && card}
//           </div>
//         ))}
//       </div>
//       {matched.length === cards.length && (
//         <div className="text-center text-2xl font-bold text-green-600 animate-bounce">
//           Congratulations! You won in {moves} moves!
//         </div>
//       )}
//     </div>
//   );
// }
const MemoryGame = () => {
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = () => {
    const initialCards = [
      { id: 1, value: 'A', flipped: false },
      { id: 2, value: 'A', flipped: false },
      { id: 3, value: 'B', flipped: false },
      { id: 4, value: 'B', flipped: false },
      { id: 5, value: 'C', flipped: false },
      { id: 6, value: 'C', flipped: false },
      { id: 7, value: 'D', flipped: false },
      { id: 8, value: 'D', flipped: false },
    ];
    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const shuffleArray = (array: { id: number; value: string; flipped: boolean }[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index: number) => {
    if (isChecking || flippedCards.length === 2 || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 1000);
    }
  };

  const checkForMatch = (newFlippedCards: number[]) => {
    const [firstIndex, secondIndex] = newFlippedCards;
    if (cards[firstIndex].value === cards[secondIndex].value) {
      setMatchedCards([...matchedCards, firstIndex, secondIndex]);
    }
    setFlippedCards([]);
    setIsChecking(false);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`h-32 w-32 flex items-center justify-center text-white text-xl font-bold cursor-pointer ${
            flippedCards.includes(index) || matchedCards.includes(index)
              ? 'bg-green-500'
              : 'bg-blue-500'
          }`}
          onClick={() => handleCardClick(index)}
        >
          {(flippedCards.includes(index) || matchedCards.includes(index)) && card.value}
        </div>
      ))}
    </div>
  );
};

function ZenGarden() {
  const [elements, setElements] = useState<{ type: string; x: number; y: number; rotation: number }[]>([]);
  const [selectedElement, setSelectedElement] = useState(ZEN_ELEMENTS[0]);

  const addElement = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = Math.random() * 360;
    setElements([...elements, { type: selectedElement, x, y, rotation }]);
  };

  const clearGarden = () => setElements([]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {ZEN_ELEMENTS.map((element) => (
            <button
              key={element}
              onClick={() => setSelectedElement(element)}
              className={`text-2xl p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                selectedElement === element ? 'bg-blue-100 shadow-md' : 'bg-gray-100'
              }`}
            >
              {element}
            </button>
          ))}
        </div>
        <button
          onClick={clearGarden}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear Garden
        </button>
      </div>
      <div
        onClick={addElement}
        className="w-full h-96 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg relative cursor-crosshair shadow-inner"
      >
        {elements.map((element, index) => (
          <div
            key={index}
            style={{ 
              left: element.x, 
              top: element.y,
              transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`
            }}
            className="absolute text-2xl transition-all duration-300 hover:scale-125"
          >
            {element.type}
          </div>
        ))}
      </div>
    </div>
  );
}

function BubblePop() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setBubbles(current => [
          ...current,
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: 100 + Math.random() * 20,
            size: 30 + Math.random() * 40,
            color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
          }
        ]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(current => 
        current.map(bubble => ({
          ...bubble,
          y: bubble.y - 0.5
        })).filter(bubble => bubble.y > -10)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const popBubble = (id: number) => {
    setBubbles(current => current.filter(bubble => bubble.id !== id));
    setScore(score + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Score: {score}</div>
        <button
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) setScore(0);
          }}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className="relative h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden shadow-inner">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            className="absolute rounded-full cursor-pointer transition-transform hover:scale-110 animate-float"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: bubble.color,
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// function PatternMatch() {
//   const [pattern, setPattern] = useState<number[]>([]);
//   const [playerPattern, setPlayerPattern] = useState<number[]>([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [score, setScore] = useState(0);
//   const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

//   const startGame = () => {
//     setIsPlaying(true);
//     setScore(0);
//     generatePattern();
//   };

//   const generatePattern = () => {
//     const newPattern = [...pattern, Math.floor(Math.random() * 4)];
//     setPattern(newPattern);
//     setPlayerPattern([]);
//     playPattern(newPattern);
//   };

//   const playPattern = (sequence: number[]) => {
//     sequence.forEach((color, index) => {
//       setTimeout(() => {
//         const button = document.getElementById(`color-${color}`);
//         if (button) {
//           button.classList.add('opacity-100');
//           setTimeout(() => button.classList.remove('opacity-100'), 500);
//         }
//       }, (index + 1) * 1000);
//     });
//   };

//   const handleColorClick = (colorIndex: number) => {
//     if (!isPlaying) return;
    
//     const newPlayerPattern = [...playerPattern, colorIndex];
//     setPlayerPattern(newPlayerPattern);

//     if (newPlayerPattern[newPlayerPattern.length - 1] !== pattern[newPlayerPattern.length - 1]) {
//       setIsPlaying(false);
//       return;
//     }

//     if (newPlayerPattern.length === pattern.length) {
//       setScore(score + 1);
//       setTimeout(generatePattern, 1000);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="text-2xl font-bold">Score: {score}</div>
//         <button
//           onClick={startGame}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           disabled={isPlaying}
//         >
//           {isPlaying ? 'Playing...' : 'Start Game'}
//         </button>
//       </div>
//       <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//         {colors.map((color, index) => (
//           <button
//             key={index}
//             id={`color-${index}`}
//             onClick={() => handleColorClick(index)}
//             className={`${color} h-32 rounded-lg opacity-50 transition-opacity duration-200`}
//           />
//         ))}
//       </div>
//       {!isPlaying && score > 0 && (
//         <div className="text-center text-2xl font-bold text-red-600">
//           Game Over! Score: {score}
//         </div>
//       )}
//     </div>
//   );
// }

function FocusDots() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let interval: number;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (Math.random() > 0.5) {
          const newDot = {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100
          };
          setDots(current => [...current, newDot]);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setDots([]);
  };

  const clickDot = (id: number) => {
    setDots(current => current.filter(dot => dot.id !== id));
    setScore(s => s + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Score: {score}</div>
        <div className="text-2xl font-bold">Time: {timeLeft}s</div>
        <button
          onClick={startGame}
          disabled={isPlaying}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? 'Playing...' : 'Start Game'}
        </button>
      </div>
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        {dots.map(dot => (
          <button
            key={dot.id}
            onClick={() => clickDot(dot.id)}
            className="absolute w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          />
        ))}
        {!isPlaying && timeLeft === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-3xl font-bold text-white">
              Game Over! Final Score: {score}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Relaxing Games</h1>
      
      {!selectedGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GameCard
            title="Memory Match"
            icon={<Grid2X2 className="w-8 h-8" />}
            description="Improve focus with this calming memory matching game."
            onClick={() => setSelectedGame('memory')}
          />
          <GameCard
            title="Zen Garden"
            icon={<Trees className="w-8 h-8" />}
            description="Create your own peaceful garden by arranging elements."
            onClick={() => setSelectedGame('zen')}
          />
          <GameCard
            title="Bubble Pop"
            icon={<Waves className="w-8 h-8" />}
            description="Pop calming bubbles to release stress."
            onClick={() => setSelectedGame('bubble')}
          />
          {/* <GameCard
            title="Pattern Match"
            icon={<Gamepad2 className="w-8 h-8" />}
            description="Follow the pattern sequence to create harmony."
            onClick={() => setSelectedGame('pattern')}
          /> */}
          <GameCard
            title="Focus Dots"
            icon={<Target className="w-8 h-8" />}
            description="Click appearing dots to improve concentration."
            onClick={() => setSelectedGame('dots')}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
          >
            ← Back to Games
          </button>
          {selectedGame === 'memory' && <MemoryGame />}
          {selectedGame === 'zen' && <ZenGarden />}
          {selectedGame === 'bubble' && <BubblePop />}
          {/* {selectedGame === 'pattern' && <PatternMatch />} */}
          {selectedGame === 'dots' && <FocusDots />}
        </div>
      )}
    </div>
  );
}