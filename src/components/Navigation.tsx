import React from 'react';
import { Heart, GamepadIcon, Headphones, Users, BookOpen, Wind } from 'lucide-react';

interface NavigationProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function Navigation({ onPageChange, currentPage }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg py-4 px-6">
      <div className="container mx-auto">
        <div className="flex justify-around items-center">
          <NavItem
            icon={<Heart />}
            label="Dashboard"
            active={currentPage === 'dashboard'}
            onClick={() => onPageChange('dashboard')}
          />
          <NavItem
            icon={<GamepadIcon />}
            label="Games"
            active={currentPage === 'games'}
            onClick={() => onPageChange('games')}
          />
          <NavItem
            icon={<Headphones />}
            label="Audio"
            active={currentPage === 'audio'}
            onClick={() => onPageChange('audio')}
          />
          <NavItem
            icon={<Users />}
            label="Support"
            active={currentPage === 'support'}
            onClick={() => onPageChange('support')}
          />
          <NavItem
            icon={<BookOpen />}
            label="Journal"
            active={currentPage === 'journal'}
            onClick={() => onPageChange('journal')}
          />
          <NavItem
            icon={<Wind />}
            label="Breathe"
            active={currentPage === 'breathe'}
            onClick={() => onPageChange('breathe')}
          />
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
        active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}