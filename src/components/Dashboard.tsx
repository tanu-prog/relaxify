import React, { useState } from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';

const backgrounds = [
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80', // Peaceful mountains
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80', // Calm beach
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80', // Forest
];

const affirmations = [
  "I am capable of amazing things",
  "Every day brings new opportunities for growth",
  "I choose peace and positivity",
  "I am worthy of love and respect",
  "My potential is limitless"
];

const activities = [
  "Take a 10-minute mindful walk",
  "Practice deep breathing for 5 minutes",
  "Write down three things you're grateful for",
  "Do gentle stretching exercises",
  "Listen to calming music"
];

const mindfulnessTips = [
  "Focus on five things you can see right now",
  "Notice the sensation of your feet touching the ground",
  "Listen to the sounds around you without judgment",
  "Feel your breath moving through your body",
  "Observe your thoughts like passing clouds"
];

export default function Dashboard() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stressLevel, setStressLevel] = useState(5);
  
  // Get random items for daily content
  const todaysAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  const todaysActivity = activities[Math.floor(Math.random() * activities.length)];
  const todaysTip = mindfulnessTips[Math.floor(Math.random() * mindfulnessTips.length)];

  return (
    <div 
      className="min-h-screen bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
    >
      <div className="backdrop-blur-sm bg-white/30 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Your Peaceful Space</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setBgIndex((prev) => (prev + 1) % backgrounds.length)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {bgIndex % 2 === 0 ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Calm</span>
                <span>Stressed</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Daily Affirmation"
                content={todaysAffirmation}
                type="affirmation"
              />
              <DashboardCard
                title="Recommended Activity"
                content={todaysActivity}
                type="activity"
              />
              <DashboardCard
                title="Mindfulness Tip"
                content={todaysTip}
                type="tip"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, content, type }: { title: string; content: string; type: string }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{content}</p>
      {type === 'activity' && (
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`w-full py-2 rounded-lg transition-colors ${
            isCompleted 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {isCompleted ? 'Completed!' : 'Mark as Done'}
        </button>
      )}
    </div>
  );
}