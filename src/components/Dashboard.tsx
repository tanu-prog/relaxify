import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Play, Pause, BarChart3, Heart, Sparkles } from 'lucide-react';

const backgrounds = [
  {
    url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    name: 'Peaceful Mountains',
    mood: 'Calm'
  },
  {
    url: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    name: 'Serene Beach',
    mood: 'Relaxed'
  },
  {
    url: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    name: 'Misty Forest',
    mood: 'Focused'
  },
  {
    url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    name: 'Sunset Lake',
    mood: 'Peaceful'
  }
];

const affirmations = [
  "I am capable of amazing things",
  "Every day brings new opportunities for growth",
  "I choose peace and positivity",
  "I am worthy of love and respect",
  "My potential is limitless",
  "I embrace challenges as opportunities to learn",
  "I am grateful for this moment",
  "I radiate confidence and inner strength"
];

const activities = [
  "Take a 10-minute mindful walk in nature",
  "Practice deep breathing for 5 minutes",
  "Write down three things you're grateful for",
  "Do gentle stretching exercises",
  "Listen to calming music",
  "Practice progressive muscle relaxation",
  "Meditate for 10 minutes",
  "Create something beautiful"
];

const mindfulnessTips = [
  "Focus on five things you can see right now",
  "Notice the sensation of your feet touching the ground",
  "Listen to the sounds around you without judgment",
  "Feel your breath moving through your body",
  "Observe your thoughts like passing clouds",
  "Practice the 5-4-3-2-1 grounding technique",
  "Take three deep breaths before responding",
  "Notice the temperature of the air on your skin"
];

const ambientSounds = [
  { name: 'Rain', url: 'https://www.soundjay.com/misc/sounds/rain-01.wav' },
  { name: 'Ocean', url: 'https://www.soundjay.com/misc/sounds/ocean-01.wav' },
  { name: 'Forest', url: 'https://www.soundjay.com/misc/sounds/forest-01.wav' }
];

export default function Dashboard() {
  const [bgIndex, setBgIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stressLevel, setStressLevel] = useState(5);
  const [moodScore, setMoodScore] = useState(7);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [showParticles, setShowParticles] = useState(true);
  
  // Get random items for daily content
  const todaysAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  const todaysActivity = activities[Math.floor(Math.random() * activities.length)];
  const todaysTip = mindfulnessTips[Math.floor(Math.random() * mindfulnessTips.length)];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMoodColor = (level: number) => {
    if (level <= 3) return 'text-red-500';
    if (level <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getMoodEmoji = (level: number) => {
    if (level <= 3) return '😔';
    if (level <= 6) return '😐';
    return '😊';
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center transition-all duration-1000 relative"
      style={{ backgroundImage: `url(${backgrounds[bgIndex].url})` }}
    >
      {showParticles && (
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 10 + 15}s`
              }}
            />
          ))}
        </div>
      )}
      
      <div className="backdrop-blur-sm bg-black/20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="glass-morphism rounded-2xl p-6 shadow-2xl backdrop-blur-strong mb-8 animate-fadeInScale">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white text-shadow mb-2">
                  {getGreeting()} ✨
                </h1>
                <p className="text-white/80 text-lg">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-white/60">
                  Currently viewing: {backgrounds[bgIndex].name} • {backgrounds[bgIndex].mood}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowParticles(!showParticles)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white"
                  title="Toggle particles"
                >
                  <Sparkles className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setBgIndex((prev) => (prev + 1) % backgrounds.length)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white"
                  title="Change background"
                >
                  {bgIndex % 2 === 0 ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white"
                  title="Toggle ambient sounds"
                >
                  {isPlaying ? (
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-6 h-6" />
                      <div className="audio-visualizer">
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                        <div className="audio-bar"></div>
                      </div>
                    </div>
                  ) : (
                    <VolumeX className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mood Tracking */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  How are you feeling?
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{getMoodEmoji(moodScore)}</span>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={moodScore}
                      onChange={(e) => setMoodScore(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-white/70 mt-1">
                      <span>Low</span>
                      <span className={getMoodColor(moodScore)}>
                        {moodScore}/10
                      </span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Stress Level
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {stressLevel <= 3 ? '😌' : stressLevel <= 6 ? '😐' : '😰'}
                  </span>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={stressLevel}
                      onChange={(e) => setStressLevel(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-white/70 mt-1">
                      <span>Calm</span>
                      <span className={stressLevel > 7 ? 'text-red-400' : stressLevel > 4 ? 'text-yellow-400' : 'text-green-400'}>
                        {stressLevel}/10
                      </span>
                      <span>Stressed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Daily Affirmation"
              content={todaysAffirmation}
              type="affirmation"
              icon="💫"
              gradient="from-purple-500 to-pink-500"
            />
            <DashboardCard
              title="Recommended Activity"
              content={todaysActivity}
              type="activity"
              icon="🎯"
              gradient="from-blue-500 to-cyan-500"
              onComplete={(content) => {
                if (!completedActivities.includes(content)) {
                  setCompletedActivities([...completedActivities, content]);
                }
              }}
              isCompleted={completedActivities.includes(todaysActivity)}
            />
            <DashboardCard
              title="Mindfulness Tip"
              content={todaysTip}
              type="tip"
              icon="🧘‍♀️"
              gradient="from-green-500 to-teal-500"
            />
          </div>

          {/* Quick Actions */}
          <div className="mt-8 glass-morphism rounded-2xl p-6 backdrop-blur-strong">
            <h2 className="text-2xl font-bold text-white mb-6 text-shadow">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionButton
                icon="🎮"
                label="Play Games"
                description="Relaxing mini-games"
                onClick={() => {}}
              />
              <QuickActionButton
                icon="🎵"
                label="Audio Library"
                description="Calming sounds"
                onClick={() => {}}
              />
              <QuickActionButton
                icon="📝"
                label="Journal"
                description="Write thoughts"
                onClick={() => {}}
              />
              <QuickActionButton
                icon="🫁"
                label="Breathe"
                description="Breathing exercises"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  content: string;
  type: string;
  icon: string;
  gradient: string;
  onComplete?: (content: string) => void;
  isCompleted?: boolean;
}

function DashboardCard({ title, content, type, icon, gradient, onComplete, isCompleted }: DashboardCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`glass-morphism rounded-2xl p-6 shadow-xl backdrop-blur-strong card-hover animate-slideInUp`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-2xl shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white text-shadow">{title}</h3>
      </div>
      
      <p className={`text-white/90 mb-4 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
        {content}
      </p>
      
      <div className="flex gap-2">
        {content.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
        
        {type === 'activity' && (
          <button
            onClick={() => onComplete?.(content)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
              isCompleted 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {isCompleted ? '✓ Completed!' : 'Mark as Done'}
          </button>
        )}
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
}

function QuickActionButton({ icon, label, description, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-white/20 group"
    >
      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-white font-medium mb-1">{label}</div>
      <div className="text-white/60 text-sm">{description}</div>
    </button>
  );
}