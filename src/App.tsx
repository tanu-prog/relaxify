import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import Games from './components/Games';
import Audio from './components/Audio';
import Support from './components/Support';
import Journal from './components/Journal';
import Breathe from './components/Breathe';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'games':
        return <Games />;
      case 'audio':
        return <Audio />;
      case 'support':
        return <Support />;
      case 'journal':
        return <Journal />;
      case 'breathe':
        return <Breathe />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      <Navigation onPageChange={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}

export default App;