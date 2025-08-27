import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Settings, Heart } from 'lucide-react';

const breathingPatterns = [
  {
    name: '4-7-8 Relaxation',
    description: 'Inhale for 4, hold for 7, exhale for 8. Great for sleep and anxiety.',
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: 'from-blue-400 to-purple-500'
  },
  {
    name: 'Box Breathing',
    description: 'Equal timing for all phases. Perfect for focus and calm.',
    inhale: 4,
    hold: 4,
    exhale: 4,
    color: 'from-green-400 to-teal-500'
  },
  {
    name: 'Energizing Breath',
    description: 'Quick energizing pattern to boost alertness.',
    inhale: 3,
    hold: 2,
    exhale: 3,
    color: 'from-orange-400 to-red-500'
  },
  {
    name: 'Deep Relaxation',
    description: 'Longer exhale for maximum relaxation.',
    inhale: 4,
    hold: 2,
    exhale: 8,
    color: 'from-indigo-400 to-pink-500'
  }
];

const guidedSessions = [
  {
    title: 'Morning Energizer',
    duration: 5,
    description: 'Start your day with focused breathing',
    videoUrl: 'https://www.youtube.com/embed/YRPh_GaiL8s'
  },
  {
    title: 'Stress Relief',
    duration: 10,
    description: 'Release tension and find calm',
    videoUrl: 'https://www.youtube.com/embed/tybOi4hjZFQ'
  },
  {
    title: 'Sleep Preparation',
    duration: 15,
    description: 'Prepare your mind and body for rest',
    videoUrl: 'https://www.youtube.com/embed/1Dv-ldGLnIY'
  }
];

export default function Breathe() {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [customPattern, setCustomPattern] = useState({ inhale: 4, hold: 4, exhale: 4 });
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const currentPattern = breathingPatterns[selectedPattern];
  const phaseTime = currentPattern[phase];

  useEffect(() => {
    let interval: number;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= phaseTime - 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
            } else if (phase === 'hold') {
              setPhase('exhale');
            } else {
              setPhase('inhale');
              setCycleCount(c => c + 1);
            }
            return 0;
          }
          return prev + 1;
        });
        setTotalTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, phase, phaseTime]);

  const startBreathing = () => {
    setIsBreathing(true);
    setTimer(0);
    setPhase('inhale');
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setTimer(0);
    setPhase('inhale');
  };

  const resetSession = () => {
    setIsBreathing(false);
    setTimer(0);
    setPhase('inhale');
    setCycleCount(0);
    setTotalTime(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-green-400 to-blue-500';
      case 'hold':
        return 'from-yellow-400 to-orange-500';
      case 'exhale':
        return 'from-purple-400 to-pink-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Breathing Exercises</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Practice mindful breathing with guided patterns and techniques to reduce stress and improve focus.
        </p>
      </div>

      {/* Breathing Patterns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {breathingPatterns.map((pattern, index) => (
          <div
            key={index}
            onClick={() => setSelectedPattern(index)}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedPattern === index
                ? `bg-gradient-to-br ${pattern.color} text-white shadow-2xl scale-105`
                : 'bg-white hover:shadow-xl border border-gray-100'
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{pattern.name}</h3>
            <p className={`text-sm mb-4 ${selectedPattern === index ? 'text-white/80' : 'text-gray-600'}`}>
              {pattern.description}
            </p>
            <div className="flex justify-between text-sm">
              <span>In: {pattern.inhale}s</span>
              <span>Hold: {pattern.hold}s</span>
              <span>Out: {pattern.exhale}s</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Breathing Interface */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* Stats */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{cycleCount}</div>
              <div className="text-gray-600 text-sm">Cycles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{formatTime(totalTime)}</div>
              <div className="text-gray-600 text-sm">Total Time</div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Breathing Orb */}
          <div className="relative flex items-center justify-center mb-8">
            <div className={`meditation-orb w-64 h-64 rounded-full transition-all duration-1000 ${
              isBreathing ? 'animate-breathe' : ''
            } bg-gradient-to-br ${getPhaseColor()}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Wind className={`w-16 h-16 text-white transition-all duration-1000 ${
                  isBreathing ? 'opacity-80 scale-110' : 'opacity-100'
                }`} />
              </div>
              
              {/* Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="4"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - (timer + 1) / phaseTime)}`}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {getPhaseInstruction()}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              {currentPattern.name}
            </p>
            <div className="text-4xl font-bold text-gray-800">
              {phaseTime - timer}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={isBreathing ? stopBreathing : startBreathing}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                isBreathing
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
              }`}
            >
              {isBreathing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              {isBreathing ? 'Pause' : 'Start Breathing'}
            </button>
            
            <button
              onClick={resetSession}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Guided Sessions */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Guided Sessions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {guidedSessions.map((session, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedSession(selectedSession === index ? null : index)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{session.title}</h3>
                  <p className="text-gray-600">{session.duration} minutes</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{session.description}</p>
              
              {selectedSession === index && (
                <div className="mt-6 animate-slideInUp">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={session.videoUrl}
                      title={session.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Breathing Tips</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Find Your Rhythm</h4>
                <p className="text-gray-600 text-sm">Start with shorter patterns and gradually increase duration as you become more comfortable.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Comfortable Position</h4>
                <p className="text-gray-600 text-sm">Sit or lie down in a comfortable position with your spine straight.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Focus on Breath</h4>
                <p className="text-gray-600 text-sm">Pay attention to the sensation of air moving in and out of your body.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Be Patient</h4>
                <p className="text-gray-600 text-sm">It's normal for your mind to wander. Gently bring your attention back to your breath.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}