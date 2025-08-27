import React, { useState } from 'react';
import { BookOpen, Save, List } from 'lucide-react';

export default function Journal() {
  const [entries, setEntries] = useState<Array<{ date: string; content: string }>>([]);
  const [currentEntry, setCurrentEntry] = useState('');

  const saveEntry = () => {
    if (currentEntry.trim()) {
      setEntries([
        { date: new Date().toLocaleDateString(), content: currentEntry },
        ...entries
      ]);
      setCurrentEntry('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mindfulness Journal</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">New Entry</h2>
          </div>
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          ></textarea>
          <button
            onClick={saveEntry}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Entry
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <List className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Previous Entries</h2>
          </div>
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={index} className="border-b pb-4">
                <div className="text-sm text-gray-500 mb-2">{entry.date}</div>
                <p className="text-gray-700">{entry.content}</p>
              </div>
            ))}
            {entries.length === 0 && (
              <p className="text-gray-500 text-center py-8">No journal entries yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}