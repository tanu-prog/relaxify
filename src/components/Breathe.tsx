import React, { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

export default function Breathe() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => (prev + 1) % 8);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Breathing Exercises</h1>

      <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow-lg text-center">
        <div className={`relative w-48 h-48 mx-auto mb-6 transition-transform duration-1000 ${
          isBreathing ? 'scale-110' : 'scale-100'
        }`}>
          <div className={`absolute inset-0 bg-blue-100 rounded-full transition-transform duration-4000 ${
            isBreathing ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Wind className={`w-16 h-16 text-blue-600 transition-opacity duration-1000 ${
              isBreathing ? 'opacity-50' : 'opacity-100'
            }`} />
          </div>
        </div>

        <p className="text-xl font-medium text-gray-800 mb-4">
          {isBreathing ? (
            timer < 4 ? 'Breathe in...' : 'Breathe out...'
          ) : 'Ready to start?'}
        </p>

        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isBreathing ? 'Stop' : 'Start Breathing Exercise'}
        </button>

        <div className="mt-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Find a comfortable position</li>
            <li>Follow the breathing animation</li>
            <li>Breathe in for 4 seconds</li>
            <li>Breathe out for 4 seconds</li>
            <li>Continue for at least 1-2 minutes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}