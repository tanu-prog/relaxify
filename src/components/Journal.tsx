import React, { useState, useEffect } from 'react';
import { BookOpen, Save, List, Search, Calendar, Heart, Smile, Meh, Frown, Tag, Download, Share2 } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
  tags: string[];
  gratitude: string[];
  goals: string[];
}

const moodEmojis = {
  happy: { emoji: '😊', color: 'text-green-500', bg: 'bg-green-50' },
  neutral: { emoji: '😐', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  sad: { emoji: '😔', color: 'text-red-500', bg: 'bg-red-50' }
};

const journalPrompts = [
  "What am I most grateful for today?",
  "What challenged me today and how did I handle it?",
  "What made me smile today?",
  "What would I like to improve about today?",
  "What am I looking forward to tomorrow?",
  "How did I practice self-care today?",
  "What lesson did I learn today?",
  "What positive impact did I have on others?"
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [currentGratitude, setCurrentGratitude] = useState<string[]>(['', '', '']);
  const [currentGoals, setCurrentGoals] = useState<string[]>(['', '', '']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        content: currentEntry,
        mood: currentMood,
        tags: currentTags,
        gratitude: currentGratitude.filter(g => g.trim()),
        goals: currentGoals.filter(g => g.trim())
      };
      
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      setCurrentTags([]);
      setCurrentGratitude(['', '', '']);
      setCurrentGoals(['', '', '']);
      setCurrentMood('neutral');
      setSelectedPrompt('');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      setCurrentTags([...currentTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCurrentTags(currentTags.filter(tag => tag !== tagToRemove));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDate = !selectedDate || entry.date.startsWith(selectedDate);
    return matchesSearch && matchesDate;
  });

  const getMoodStats = () => {
    const total = entries.length;
    if (total === 0) return { happy: 0, neutral: 0, sad: 0 };
    
    const counts = entries.reduce((acc, entry) => {
      acc[entry.mood]++;
      return acc;
    }, { happy: 0, neutral: 0, sad: 0 });

    return {
      happy: Math.round((counts.happy / total) * 100),
      neutral: Math.round((counts.neutral / total) * 100),
      sad: Math.round((counts.sad / total) * 100)
    };
  };

  const moodStats = getMoodStats();

  const exportEntries = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'journal-entries.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Mindfulness Journal</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Reflect on your thoughts, track your mood, and cultivate gratitude through mindful journaling.
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{entries.length}</div>
          <div className="text-gray-600">Total Entries</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{moodStats.happy}%</div>
          <div className="text-gray-600">Happy Days</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{moodStats.neutral}%</div>
          <div className="text-gray-600">Neutral Days</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">{moodStats.sad}%</div>
          <div className="text-gray-600">Challenging Days</div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* New Entry */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8" />
              <h2 className="text-2xl font-bold">New Entry</h2>
            </div>
            <p className="text-white/80">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">How are you feeling?</label>
              <div className="flex gap-4">
                {Object.entries(moodEmojis).map(([mood, data]) => (
                  <button
                    key={mood}
                    onClick={() => setCurrentMood(mood as any)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                      currentMood === mood 
                        ? `${data.bg} ${data.color} ring-2 ring-current scale-105` 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className="text-2xl">{data.emoji}</span>
                    <span className="capitalize font-medium">{mood}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Writing Prompts */}
            <div>
              <button
                onClick={() => setShowPrompts(!showPrompts)}
                className="text-purple-600 hover:text-purple-700 font-medium mb-3"
              >
                {showPrompts ? 'Hide' : 'Show'} Writing Prompts
              </button>
              {showPrompts && (
                <div className="grid gap-2 mb-4">
                  {journalPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedPrompt(prompt);
                        setCurrentEntry(prompt + '\n\n');
                      }}
                      className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your thoughts</label>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="What's on your mind today?"
                className="input-field h-40 resize-none"
              />
            </div>

            {/* Gratitude */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Three things I'm grateful for</label>
              {currentGratitude.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newGratitude = [...currentGratitude];
                    newGratitude[index] = e.target.value;
                    setCurrentGratitude(newGratitude);
                  }}
                  placeholder={`Gratitude ${index + 1}`}
                  className="input-field mb-2"
                />
              ))}
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tomorrow's intentions</label>
              {currentGoals.map((goal, index) => (
                <input
                  key={index}
                  type="text"
                  value={goal}
                  onChange={(e) => {
                    const newGoals = [...currentGoals];
                    newGoals[index] = e.target.value;
                    setCurrentGoals(newGoals);
                  }}
                  placeholder={`Intention ${index + 1}`}
                  className="input-field mb-2"
                />
              ))}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add a tag"
                  className="input-field flex-1"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Tag className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm cursor-pointer hover:bg-purple-200 transition-colors"
                  >
                    #{tag} ×
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={saveEntry}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Entry
            </button>
          </div>
        </div>

        {/* Previous Entries */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <List className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Journal Entries</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={exportEntries}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  title="Export entries"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries..."
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-6">
              {filteredEntries.map((entry) => (
                <JournalEntryCard key={entry.id} entry={entry} />
              ))}
              {filteredEntries.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  {entries.length === 0 ? (
                    <div>
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-xl mb-2">No journal entries yet</p>
                      <p>Start writing your first entry!</p>
                    </div>
                  ) : (
                    <p>No entries match your search criteria</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const moodData = moodEmojis[entry.mood];
  
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${moodData.bg} rounded-lg`}>
            <span className="text-xl">{moodData.emoji}</span>
          </div>
          <div>
            <div className="font-medium text-gray-800">
              {new Date(entry.date).toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(entry.date).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      </div>
      
      <p className={`text-gray-700 mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {entry.content}
      </p>
      
      {isExpanded && (
        <div className="space-y-3 animate-slideInUp">
          {entry.gratitude.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Gratitude</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {entry.gratitude.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {entry.goals.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Intentions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {entry.goals.map((goal, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-4 h-4 text-blue-500">🎯</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}