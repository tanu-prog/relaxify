import React, { useState, useEffect } from 'react';
import { Palette, Trees, Grid2X2, Waves, Gamepad2, Target, Zap, Brain, Heart, Star } from 'lucide-react';

// Enhanced Memory Game with themes
const MEMORY_THEMES = {
  nature: ['🌸', '🌺', '🌹', '🌷', '🌼', '🌻', '🍀', '🌿'],
  animals: ['🐱', '🐶', '🦋', '🐝', '🐠', '🦜', '🐰', '🦊'],
  space: ['⭐', '🌙', '☀️', '🪐', '🌟', '✨', '🌠', '🌌'],
  zen: ['🧘‍♀️', '🕯️', '🎋', '⛩️', '🪨', '💮', '🍃', '🌊']
};

// Zen Garden Elements with categories
const ZEN_CATEGORIES = {
  stones: ['🪨', '⚫', '🔘', '⚪'],
  plants: ['🌳', '🌿', '🌸', '🎋', '🍁', '🌱'],
  structures: ['⛩️', '🏮', '🗼', '🏯'],
  nature: ['💮', '🌊', '🍃', '☁️', '🌙', '⭐']
};

// Color palette for games
const GAME_COLORS = [
  'rgba(255, 107, 107, 0.8)',
  'rgba(78, 205, 196, 0.8)',
  'rgba(69, 183, 209, 0.8)',
  'rgba(150, 206, 180, 0.8)',
  'rgba(255, 238, 173, 0.8)',
  'rgba(255, 154, 162, 0.8)',
  'rgba(250, 208, 196, 0.8)',
  'rgba(212, 252, 121, 0.8)'
];

interface GameCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  gradient: string;
  onClick: () => void;
}

function GameCard({ title, icon, description, difficulty, category, gradient, onClick }: GameCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:scale-105 group relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl text-white transform group-hover:rotate-12 transition-transform duration-300">
            {icon}
          </div>
          <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
              {category}
            </span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors">
          {title}
        </h3>
        <p className="text-white/80 leading-relaxed">{description}</p>
        <div className="mt-4 flex items-center text-white/60">
          <Star className="w-4 h-4 mr-1" />
          <span className="text-sm">Tap to play</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced Memory Game
function MemoryGame() {
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof MEMORY_THEMES>('nature');
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [selectedTheme]);

  useEffect(() => {
    let interval: number;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  const initializeGame = () => {
    const themeCards = MEMORY_THEMES[selectedTheme];
    const gameCards = [...themeCards, ...themeCards].map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false
    }));
    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameCompleted(false);
  };

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index: number) => {
    if (!gameStarted) setGameStarted(true);
    
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      setTimeout(() => checkForMatch(newFlippedCards), 1000);
    }
  };

  const checkForMatch = (flippedIndices: number[]) => {
    const [first, second] = flippedIndices;
    if (cards[first].value === cards[second].value) {
      setCards(prev => prev.map((card, index) => 
        index === first || index === second 
          ? { ...card, matched: true, flipped: true }
          : card
      ));
      setScore(s => s + 100);
      
      // Check if game is completed
      const newMatchedCount = cards.filter(card => card.matched).length + 2;
      if (newMatchedCount === cards.length) {
        setGameCompleted(true);
        setScore(s => s + Math.max(0, 1000 - timeElapsed * 10));
      }
    }
    setFlippedCards([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Memory Match</h2>
          <div className="flex gap-4 text-sm">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Moves: {moves}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Time: {formatTime(timeElapsed)}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Score: {score}
            </div>
          </div>
        </div>
        
        {/* Theme Selection */}
        <div className="flex gap-2 mb-4">
          {Object.keys(MEMORY_THEMES).map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme as keyof typeof MEMORY_THEMES)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                selectedTheme === theme 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
        
        <button 
          onClick={initializeGame}
          className="bg-white text-purple-600 px-6 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors"
        >
          New Game
        </button>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer rounded-2xl transition-all duration-500 transform hover:scale-105 ${
              card.flipped || card.matched || flippedCards.includes(index)
                ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-xl rotate-y-180'
                : 'bg-gradient-to-br from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 shadow-lg'
            }`}
          >
            {(card.flipped || card.matched || flippedCards.includes(index)) && (
              <span className="animate-fadeInScale">{card.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Game Completed */}
      {gameCompleted && (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-white text-center animate-fadeInScale">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold mb-2">Congratulations!</h3>
          <p className="text-xl mb-4">
            You completed the game in {moves} moves and {formatTime(timeElapsed)}!
          </p>
          <p className="text-lg mb-6">Final Score: {score} points</p>
          <button
            onClick={initializeGame}
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// Enhanced Zen Garden
function ZenGarden() {
  const [elements, setElements] = useState<{ type: string; x: number; y: number; rotation: number; size: number; category: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof ZEN_CATEGORIES>('stones');
  const [selectedElement, setSelectedElement] = useState(ZEN_CATEGORIES.stones[0]);
  const [brushSize, setBrushSize] = useState(1);
  const [showGrid, setShowGrid] = useState(false);

  const addElement = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const rotation = Math.random() * 360;
    const size = 0.8 + (brushSize * 0.4);
    
    setElements(prev => [...prev, { 
      type: selectedElement, 
      x, 
      y, 
      rotation, 
      size,
      category: selectedCategory 
    }]);
  };

  const clearGarden = () => setElements([]);
  
  const saveGarden = () => {
    const gardenData = JSON.stringify(elements);
    localStorage.setItem('zenGarden', gardenData);
    alert('Garden saved! 🌸');
  };

  const loadGarden = () => {
    const saved = localStorage.getItem('zenGarden');
    if (saved) {
      setElements(JSON.parse(saved));
    }
  };

  return (
    <div className="space-y-6">
      {/* Garden Controls */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Zen Garden Creator</h2>
        
        {/* Category Selection */}
        <div className="flex gap-2 mb-4">
          {Object.keys(ZEN_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category as keyof typeof ZEN_CATEGORIES);
                setSelectedElement(ZEN_CATEGORIES[category as keyof typeof ZEN_CATEGORIES][0]);
              }}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                selectedCategory === category 
                  ? 'bg-white text-orange-600 shadow-lg' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Element Selection */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {ZEN_CATEGORIES[selectedCategory].map((element) => (
            <button
              key={element}
              onClick={() => setSelectedElement(element)}
              className={`text-3xl p-3 rounded-xl transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${
                selectedElement === element 
                  ? 'bg-white/30 shadow-lg scale-110' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {element}
            </button>
          ))}
        </div>

        {/* Tools */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm">Size:</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.5"
              value={brushSize}
              onChange={(e) => setBrushSize(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-4 py-2 rounded-xl transition-all ${
              showGrid ? 'bg-white text-orange-600' : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            Grid
          </button>
          <button
            onClick={saveGarden}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
          >
            Save
          </button>
          <button
            onClick={loadGarden}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all"
          >
            Load
          </button>
          <button
            onClick={clearGarden}
            className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-xl transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Garden Canvas */}
      <div
        onClick={addElement}
        className={`w-full h-96 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl relative cursor-crosshair shadow-inner overflow-hidden ${
          showGrid ? 'bg-grid-pattern' : ''
        }`}
        style={{
          backgroundImage: showGrid ? 
            'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)' : 'none',
          backgroundSize: showGrid ? '20px 20px' : 'auto'
        }}
      >
        {elements.map((element, index) => (
          <div
            key={index}
            style={{ 
              left: `${element.x}%`, 
              top: `${element.y}%`,
              transform: `translate(-50%, -50%) rotate(${element.rotation}deg) scale(${element.size})`,
              fontSize: `${24 * element.size}px`
            }}
            className="absolute transition-all duration-300 hover:scale-125 cursor-pointer select-none"
            onClick={(e) => {
              e.stopPropagation();
              setElements(prev => prev.filter((_, i) => i !== index));
            }}
            title="Click to remove"
          >
            {element.type}
          </div>
        ))}
        
        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl">
            Click anywhere to start creating your zen garden ✨
          </div>
        )}
      </div>

      <div className="text-center text-gray-600">
        <p>Elements placed: {elements.length} | Click elements to remove them</p>
      </div>
    </div>
  );
}

// Enhanced Bubble Pop with power-ups
function BubblePop() {
  const [bubbles, setBubbles] = useState<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    color: string; 
    type: 'normal' | 'bonus' | 'multiplier';
    speed: number;
  }[]>([]);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    let interval: number;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        
        // Spawn bubbles based on level
        if (Math.random() > 0.3) {
          const bubbleType = Math.random() > 0.9 ? 'bonus' : Math.random() > 0.95 ? 'multiplier' : 'normal';
          const newBubble = {
            id: Date.now() + Math.random(),
            x: Math.random() * 90 + 5,
            y: 105,
            size: 30 + Math.random() * (20 + level * 5),
            color: bubbleType === 'bonus' ? 'rgba(255, 215, 0, 0.8)' : 
                   bubbleType === 'multiplier' ? 'rgba(255, 0, 255, 0.8)' :
                   GAME_COLORS[Math.floor(Math.random() * GAME_COLORS.length)],
            type: bubbleType,
            speed: 0.5 + (level * 0.1)
          };
          setBubbles(current => [...current, newBubble]);
        }
      }, 1000 - (level * 50));
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, level]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(current => 
        current.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed
        })).filter(bubble => bubble.y > -10)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Level up every 1000 points
    const newLevel = Math.floor(score / 1000) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [score, level]);

  const popBubble = (id: number, type: string) => {
    setBubbles(current => current.filter(bubble => bubble.id !== id));
    
    let points = 10;
    if (type === 'bonus') {
      points = 50;
      setCombo(c => c + 1);
    } else if (type === 'multiplier') {
      points = 25;
      setMultiplier(m => Math.min(m + 1, 5));
      setTimeout(() => setMultiplier(1), 5000);
    } else {
      setCombo(c => c + 1);
    }
    
    setScore(s => s + (points * multiplier * Math.max(1, combo / 5)));
    
    // Reset combo after 2 seconds of no pops
    setTimeout(() => setCombo(0), 2000);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(60);
    setMultiplier(1);
    setCombo(0);
    setLevel(1);
    setBubbles([]);
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Bubble Pop</h2>
          <div className="flex gap-4 text-sm">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Score: {score.toLocaleString()}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Level: {level}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Time: {timeLeft}s
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {multiplier > 1 && (
              <div className="bg-purple-500/80 px-3 py-1 rounded-full animate-pulse">
                {multiplier}x Multiplier!
              </div>
            )}
            {combo > 5 && (
              <div className="bg-yellow-500/80 px-3 py-1 rounded-full animate-bounce">
                {combo} Combo!
              </div>
            )}
          </div>
          
          <button
            onClick={startGame}
            disabled={isPlaying}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              isPlaying 
                ? 'bg-white/20 text-white/60 cursor-not-allowed'
                : 'bg-white text-blue-600 hover:bg-gray-100'
            }`}
          >
            {isPlaying ? 'Playing...' : 'Start Game'}
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-96 bg-gradient-to-b from-sky-100 via-blue-100 to-blue-200 rounded-2xl overflow-hidden shadow-inner">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            onClick={() => popBubble(bubble.id, bubble.type)}
            className={`absolute rounded-full cursor-pointer transition-transform hover:scale-110 animate-float ${
              bubble.type === 'bonus' ? 'animate-pulse' : 
              bubble.type === 'multiplier' ? 'animate-bounce' : ''
            }`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: bubble.color,
              boxShadow: `0 0 20px ${bubble.color}, inset 0 0 20px rgba(255,255,255,0.3)`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {bubble.type === 'bonus' && (
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                ⭐
              </div>
            )}
            {bubble.type === 'multiplier' && (
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                ✨
              </div>
            )}
          </div>
        ))}
        
        {!isPlaying && timeLeft === 0 && score > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
              <p className="text-xl mb-4">Final Score: {score.toLocaleString()}</p>
              <p className="text-lg mb-6">Highest Level: {level}</p>
              <button
                onClick={startGame}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {!isPlaying && timeLeft === 60 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
            Click "Start Game" to begin popping bubbles! 🫧
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white/50 rounded-xl p-4 text-gray-700">
        <h4 className="font-semibold mb-2">How to Play:</h4>
        <ul className="text-sm space-y-1">
          <li>• Pop bubbles by clicking them</li>
          <li>• ⭐ Golden bubbles give bonus points</li>
          <li>• ✨ Purple bubbles give score multipliers</li>
          <li>• Build combos for extra points</li>
          <li>• Level up every 1000 points for faster bubbles</li>
        </ul>
      </div>
    </div>
  );
}

// New Snake Game
function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(200);

  const BOARD_SIZE = 20;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setSpeed(s => Math.max(s - 5, 100));
          setFood({
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [direction, food, isPlaying, gameOver, speed]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setSpeed(200);
  };

  const stopGame = () => {
    setIsPlaying(false);
    setGameOver(true);
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Snake Game</h2>
          <div className="flex gap-4 text-sm">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Score: {score}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Length: {snake.length}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={startGame}
            className="bg-white text-green-600 px-6 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            {isPlaying ? 'Restart' : 'Start Game'}
          </button>
          {isPlaying && (
            <button
              onClick={stopGame}
              className="bg-red-500/80 hover:bg-red-600 px-6 py-2 rounded-xl font-medium transition-colors"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-green-100 rounded-2xl p-4 mx-auto" style={{ width: 'fit-content' }}>
        <div 
          className="grid gap-1 bg-green-200 p-2 rounded-xl"
          style={{ 
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            width: '400px',
            height: '400px'
          }}
        >
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
            const x = index % BOARD_SIZE;
            const y = Math.floor(index / BOARD_SIZE);
            const isSnake = snake.some(segment => segment.x === x && segment.y === y);
            const isHead = snake[0]?.x === x && snake[0]?.y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className={`rounded-sm transition-all duration-100 ${
                  isFood ? 'bg-red-500 animate-pulse' :
                  isHead ? 'bg-green-800 shadow-lg' :
                  isSnake ? 'bg-green-600' :
                  'bg-green-50'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Use arrow keys to control the snake</p>
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          <div></div>
          <button 
            onClick={() => isPlaying && direction.y === 0 && setDirection({ x: 0, y: -1 })}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors"
          >
            ↑
          </button>
          <div></div>
          <button 
            onClick={() => isPlaying && direction.x === 0 && setDirection({ x: -1, y: 0 })}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors"
          >
            ←
          </button>
          <div></div>
          <button 
            onClick={() => isPlaying && direction.x === 0 && setDirection({ x: 1, y: 0 })}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors"
          >
            →
          </button>
          <div></div>
          <button 
            onClick={() => isPlaying && direction.y === 0 && setDirection({ x: 0, y: 1 })}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors"
          >
            ↓
          </button>
          <div></div>
        </div>
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl p-8 text-white text-center animate-fadeInScale">
          <div className="text-6xl mb-4">🐍</div>
          <h3 className="text-3xl font-bold mb-2">Game Over!</h3>
          <p className="text-xl mb-4">Final Score: {score}</p>
          <p className="text-lg mb-6">Snake Length: {snake.length}</p>
          <button
            onClick={startGame}
            className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// Enhanced Focus Dots with levels
function FocusDots() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; size: number; color: string; points: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const [accuracy, setAccuracy] = useState(100);
  const [clicks, setClicks] = useState(0);
  const [hits, setHits] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        
        // Spawn dots based on level
        if (Math.random() > 0.4 - (level * 0.05)) {
          const dotSize = Math.max(20, 50 - (level * 3));
          const newDot = {
            id: Date.now() + Math.random(),
            x: Math.random() * (100 - 10) + 5,
            y: Math.random() * (100 - 10) + 5,
            size: dotSize,
            color: GAME_COLORS[Math.floor(Math.random() * GAME_COLORS.length)],
            points: Math.floor(100 / dotSize * 10)
          };
          setDots(current => [...current, newDot]);
          
          // Remove dot after some time
          setTimeout(() => {
            setDots(current => current.filter(dot => dot.id !== newDot.id));
          }, Math.max(1000, 3000 - (level * 200)));
        }
      }, Math.max(300, 1000 - (level * 50)));
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, level]);

  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
    }
  }, [score, level]);

  useEffect(() => {
    if (clicks > 0) {
      setAccuracy(Math.round((hits / clicks) * 100));
    }
  }, [hits, clicks]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setDots([]);
    setLevel(1);
    setClicks(0);
    setHits(0);
    setAccuracy(100);
  };

  const clickDot = (id: number, points: number) => {
    setDots(current => current.filter(dot => dot.id !== id));
    setScore(s => s + points);
    setHits(h => h + 1);
  };

  const handleMiss = () => {
    setClicks(c => c + 1);
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Focus Dots</h2>
          <div className="flex gap-4 text-sm">
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Score: {score}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Level: {level}
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Time: {timeLeft}s
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full">
              Accuracy: {accuracy}%
            </div>
          </div>
        </div>
        
        <button
          onClick={startGame}
          disabled={isPlaying}
          className={`px-6 py-2 rounded-xl font-medium transition-all ${
            isPlaying 
              ? 'bg-white/20 text-white/60 cursor-not-allowed'
              : 'bg-white text-red-600 hover:bg-gray-100'
          }`}
        >
          {isPlaying ? 'Playing...' : 'Start Game'}
        </button>
      </div>

      {/* Game Area */}
      <div 
        className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden cursor-crosshair"
        onClick={handleMiss}
      >
        {dots.map(dot => (
          <button
            key={dot.id}
            onClick={(e) => {
              e.stopPropagation();
              clickDot(dot.id, dot.points);
              setClicks(c => c + 1);
            }}
            className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform animate-pulse shadow-lg"
            style={{ 
              left: `${dot.x}%`, 
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              boxShadow: `0 0 20px ${dot.color}`
            }}
          >
            <span className="text-white font-bold text-xs">
              {dot.points}
            </span>
          </button>
        ))}
        
        {!isPlaying && timeLeft === 0 && score > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold mb-2">Great Focus!</h3>
              <p className="text-xl mb-2">Final Score: {score}</p>
              <p className="text-lg mb-2">Accuracy: {accuracy}%</p>
              <p className="text-lg mb-6">Highest Level: {level}</p>
              <button
                onClick={startGame}
                className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {!isPlaying && timeLeft === 30 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
            Click the dots as fast as you can! 🎯
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white/50 rounded-xl p-4 text-gray-700">
        <h4 className="font-semibold mb-2">How to Play:</h4>
        <ul className="text-sm space-y-1">
          <li>• Click on the colored dots as they appear</li>
          <li>• Smaller dots give more points</li>
          <li>• Level up every 500 points</li>
          <li>• Higher levels = smaller dots and faster spawning</li>
          <li>• Try to maintain high accuracy!</li>
        </ul>
      </div>
    </div>
  );
}

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const gamesList = [
    {
      id: 'memory',
      title: 'Memory Match',
      icon: <Grid2X2 className="w-8 h-8" />,
      description: 'Improve focus and memory with themed matching cards. Multiple themes and difficulty levels.',
      difficulty: 'Easy' as const,
      category: 'Memory',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'zen',
      title: 'Zen Garden',
      icon: <Trees className="w-8 h-8" />,
      description: 'Create beautiful zen gardens with various elements. Save and load your creations.',
      difficulty: 'Easy' as const,
      category: 'Creative',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      id: 'bubble',
      title: 'Bubble Pop',
      icon: <Waves className="w-8 h-8" />,
      description: 'Pop colorful bubbles with power-ups, combos, and increasing difficulty levels.',
      difficulty: 'Medium' as const,
      category: 'Action',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      id: 'snake',
      title: 'Zen Snake',
      icon: <Zap className="w-8 h-8" />,
      description: 'Classic snake game with smooth controls and progressive difficulty.',
      difficulty: 'Medium' as const,
      category: 'Classic',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      id: 'dots',
      title: 'Focus Dots',
      icon: <Target className="w-8 h-8" />,
      description: 'Test your reaction time and accuracy with appearing dots. Track your progress.',
      difficulty: 'Hard' as const,
      category: 'Focus',
      gradient: 'from-red-400 to-pink-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Mindful Games</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Engage your mind with our collection of relaxing and focus-enhancing games. 
          Each game is designed to promote mindfulness while having fun.
        </p>
      </div>
      
      {!selectedGame ? (
        <div className="game-grid">
          {gamesList.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={game.icon}
              description={game.description}
              difficulty={game.difficulty}
              category={game.category}
              gradient={game.gradient}
              onClick={() => setSelectedGame(game.id)}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-lg font-medium group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Games
          </button>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              {selectedGame === 'memory' && <MemoryGame />}
              {selectedGame === 'zen' && <ZenGarden />}
              {selectedGame === 'bubble' && <BubblePop />}
              {selectedGame === 'snake' && <SnakeGame />}
              {selectedGame === 'dots' && <FocusDots />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}