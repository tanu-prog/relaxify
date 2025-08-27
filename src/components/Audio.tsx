import React, { useState } from 'react';
import { Music, Wind, Bird, Waves, Play, Pause } from 'lucide-react';

const audioTracks = [
  { title: 'Calming Meditation', icon: <Music />, duration: '10:00', category: 'Meditation', src: 'src/audio/calming-meditation.mp3' },
  { title: 'Forest Ambience', icon: <Bird />, duration: '15:00', category: 'Nature', src: 'src/audio/forest-ambience.mp3' },
  { title: 'Ocean Waves', icon: <Waves />, duration: '20:00', category: 'Nature', src: 'src/audio/ocean-waves.mp3' },
  { title: 'Wind Chimes', icon: <Wind />, duration: '8:00', category: 'Ambient', src: 'src/audio/wind-chimes.mp3' },
];

export default function Audio() {
  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Audio Resources</h1>
      <div className="grid gap-4">
        {audioTracks.map((track, index) => (
          <AudioTrack key={index} {...track} />
        ))}
      </div>
    </div>
  );
}

function AudioTrack({ title, icon, duration, category, src }: { title: string; icon: React.ReactNode; duration: string; category: string; src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <span className="text-sm text-gray-500">{duration}</span>
      <button onClick={togglePlayPause} className="p-2 hover:bg-gray-100 rounded-full">
        {isPlaying ? <Pause className="w-5 h-5 text-purple-600" /> : <Play className="w-5 h-5 text-purple-600" />}
      </button>
      <audio ref={audioRef} src={src} />
    </div>
  );
}
