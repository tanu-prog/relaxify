import React, { useState, useRef, useEffect } from 'react';
import { Music, Wind, Bird, Waves, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Heart, Download, Share2 } from 'lucide-react';

const audioTracks = [
  { 
    title: 'Calming Meditation', 
    icon: <Music />, 
    duration: '10:00', 
    category: 'Meditation', 
    description: 'Gentle meditation music for deep relaxation',
    videoUrl: 'https://www.youtube.com/embed/1ZYbU82GVz4',
    color: 'from-purple-500 to-pink-500',
    tags: ['meditation', 'calm', 'sleep']
  },
  { 
    title: 'Forest Ambience', 
    icon: <Bird />, 
    duration: '15:00', 
    category: 'Nature', 
    description: 'Peaceful forest sounds with chirping birds',
    videoUrl: 'https://www.youtube.com/embed/eKFTSSKCzWA',
    color: 'from-green-500 to-teal-500',
    tags: ['nature', 'forest', 'birds']
  },
  { 
    title: 'Ocean Waves', 
    icon: <Waves />, 
    duration: '20:00', 
    category: 'Nature', 
    description: 'Soothing ocean waves for stress relief',
    videoUrl: 'https://www.youtube.com/embed/V1bFr2SWP1I',
    color: 'from-blue-500 to-cyan-500',
    tags: ['ocean', 'waves', 'relaxation']
  },
  { 
    title: 'Wind Chimes', 
    icon: <Wind />, 
    duration: '8:00', 
    category: 'Ambient', 
    description: 'Gentle wind chimes in a soft breeze',
    videoUrl: 'https://www.youtube.com/embed/mDV9Am5AlYY',
    color: 'from-amber-400 to-orange-500',
    tags: ['ambient', 'chimes', 'peaceful']
  },
  {
    title: 'Rain Sounds',
    icon: <Waves />,
    duration: '12:00',
    category: 'Nature',
    description: 'Gentle rain sounds for focus and sleep',
    videoUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
    color: 'from-gray-500 to-blue-500',
    tags: ['rain', 'focus', 'sleep']
  },
  {
    title: 'Tibetan Bowls',
    icon: <Music />,
    duration: '18:00',
    category: 'Meditation',
    description: 'Healing tibetan singing bowls',
    videoUrl: 'https://www.youtube.com/embed/sUKiOcV7Qbo',
    color: 'from-yellow-500 to-red-500',
    tags: ['tibetan', 'healing', 'bowls']
  }
];

const playlists = [
  {
    name: 'Sleep & Dreams',
    description: 'Perfect sounds for a peaceful night\'s sleep',
    tracks: ['Calming Meditation', 'Ocean Waves', 'Rain Sounds'],
    color: 'from-indigo-500 to-purple-600',
    icon: '🌙'
  },
  {
    name: 'Focus & Study',
    description: 'Ambient sounds to enhance concentration',
    tracks: ['Forest Ambience', 'Rain Sounds', 'Wind Chimes'],
    color: 'from-green-500 to-blue-500',
    icon: '📚'
  },
  {
    name: 'Meditation & Mindfulness',
    description: 'Sounds for deep meditation practice',
    tracks: ['Tibetan Bowls', 'Calming Meditation', 'Wind Chimes'],
    color: 'from-purple-500 to-pink-500',
    icon: '🧘‍♀️'
  }
];

const categories = ['All', 'Meditation', 'Nature', 'Ambient'];

export default function Audio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVideo, setShowVideo] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredTracks = selectedCategory === 'All' 
    ? audioTracks 
    : audioTracks.filter(track => track.category === selectedCategory);

  const toggleFavorite = (title: string) => {
    setFavorites(prev => 
      prev.includes(title) 
        ? prev.filter(fav => fav !== title)
        : [...prev, title]
    );
  };

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentTrack !== null) {
      const nextIndex = (currentTrack + 1) % filteredTracks.length;
      setCurrentTrack(nextIndex);
    }
  };

  const prevTrack = () => {
    if (currentTrack !== null) {
      const prevIndex = currentTrack === 0 ? filteredTracks.length - 1 : currentTrack - 1;
      setCurrentTrack(prevIndex);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Audio Library</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in our curated collection of calming sounds, meditation music, and nature ambiences.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl p-2 shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Curated Playlists</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${playlist.color} rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}
              onClick={() => setSelectedPlaylist(selectedPlaylist === playlist.name ? null : playlist.name)}
            >
              <div className="text-4xl mb-4">{playlist.icon}</div>
              <h3 className="text-xl font-bold mb-2">{playlist.name}</h3>
              <p className="text-white/80 mb-4">{playlist.description}</p>
              <div className="text-sm text-white/70">
                {playlist.tracks.length} tracks
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Tracks */}
      <div className="grid gap-6">
        {filteredTracks.map((track, index) => (
          <AudioTrack
            key={index}
            track={track}
            index={index}
            isPlaying={isPlaying && currentTrack === index}
            isFavorite={favorites.includes(track.title)}
            onPlay={() => playTrack(index)}
            onToggleFavorite={() => toggleFavorite(track.title)}
            onShowVideo={() => setShowVideo(showVideo === index ? null : index)}
            showVideo={showVideo === index}
          />
        ))}
      </div>

      {/* Audio Player */}
      {currentTrack !== null && (
        <div className="fixed bottom-20 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${filteredTracks[currentTrack].color} flex items-center justify-center text-white text-2xl`}>
              {filteredTracks[currentTrack].icon}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{filteredTracks[currentTrack].title}</h3>
              <p className="text-gray-600 text-sm">{filteredTracks[currentTrack].category}</p>
              
              {/* Progress Bar */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{filteredTracks[currentTrack].duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTrack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SkipBack className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button
                onClick={nextTrack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SkipForward className="w-5 h-5 text-gray-600" />
              </button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface AudioTrackProps {
  track: typeof audioTracks[0];
  index: number;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: () => void;
  onToggleFavorite: () => void;
  onShowVideo: () => void;
  showVideo: boolean;
}

function AudioTrack({ 
  track, 
  index, 
  isPlaying, 
  isFavorite, 
  onPlay, 
  onToggleFavorite, 
  onShowVideo, 
  showVideo 
}: AudioTrackProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
            {track.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-gray-800">{track.title}</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {track.category}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{track.description}</p>
            <div className="flex items-center gap-2">
              {track.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">{track.duration}</span>
            
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onShowVideo}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
            >
              📺
            </button>

            <button
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={onPlay}
              className={`p-3 rounded-full transition-all ${
                isPlaying
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Video Player */}
        {showVideo && (
          <div className="mt-6 animate-slideInUp">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={track.videoUrl}
                title={track.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* Audio Visualizer */}
      {isPlaying && (
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-1 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}